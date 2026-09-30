import nodemailer from 'nodemailer'

export interface MailOptions {
  from?: string
  to: string
  replyTo?: string
  subject: string
  text: string
  html: string
  attachments?: Array<{ filename: string; content: Buffer }>
}

const DEFAULT_SMTP_USER = process.env.SMTP_USER || 'leads.travash@gmail.com'
const DEFAULT_SMTP_PASS = process.env.SMTP_PASSWORD || process.env.SMTP_PASS || 'hjihbjgfgeqnsfrl'

// Standard Nodemailer SMTP Transporter
export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: Number(process.env.SMTP_PORT || 587),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: DEFAULT_SMTP_USER,
    pass: DEFAULT_SMTP_PASS,
  },
  requireTLS: true,
  connectionTimeout: 15000,
  greetingTimeout: 15000,
  socketTimeout: 30000,
})

/**
 * Get an OAuth2 access token from Microsoft Entra / Azure AD.
 * Supports:
 * 1. Refresh Token grant (delegated user permission)
 * 2. Client Credentials grant (application permission via Microsoft Graph)
 */
async function getMicrosoftOAuth2AccessToken(): Promise<string | null> {
  const tenantId = process.env.MICROSOFT_TENANT_ID
  const clientId = process.env.MICROSOFT_CLIENT_ID
  const clientSecret = process.env.MICROSOFT_CLIENT_SECRET
  const refreshToken = process.env.MICROSOFT_REFRESH_TOKEN

  if (!tenantId || !clientId || !clientSecret || clientSecret === 'YOUR_CLIENT_SECRET') {
    return null
  }

  const tokenEndpoint = `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`

  // 1. If refresh token is present, use refresh_token grant
  if (refreshToken && refreshToken.trim().length > 0) {
    try {
      const params = new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: 'refresh_token',
        refresh_token: refreshToken.trim(),
        scope: 'offline_access https://graph.microsoft.com/Mail.Send',
      })

      const res = await fetch(tokenEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params.toString(),
      })

      if (res.ok) {
        const data = await res.json()
        return data.access_token
      } else {
        const errData = await res.json().catch(() => ({}))
        console.warn('⚠️ Microsoft OAuth2 Refresh Token exchange failed:', errData)
      }
    } catch (e) {
      console.warn('⚠️ Error requesting token with refresh_token:', e)
    }
  }

  // 2. Try client_credentials grant (Application permission Mail.Send on Microsoft Graph)
  try {
    const params = new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      grant_type: 'client_credentials',
      scope: 'https://graph.microsoft.com/.default',
    })

    const res = await fetch(tokenEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString(),
    })

    if (res.ok) {
      const data = await res.json()
      return data.access_token
    } else {
      const errData = await res.json().catch(() => ({}))
      console.warn('⚠️ Microsoft Client Credentials token request returned:', errData)
    }
  } catch (e) {
    console.warn('⚠️ Error requesting token with client_credentials:', e)
  }

  return null
}

/**
 * Send email using Microsoft Graph API
 */
async function sendViaMicrosoftGraph(accessToken: string, options: MailOptions): Promise<boolean> {
  const senderEmail = process.env.SMTP_USER || 'ravi.belpade@travash.com'
  const endpoint = `https://graph.microsoft.com/v1.0/users/${encodeURIComponent(senderEmail)}/sendMail`

  const recipients = options.to
    .split(',')
    .map((e) => ({ emailAddress: { address: e.trim() } }))
    .filter((r) => r.emailAddress.address.length > 0)

  const payload = {
    message: {
      subject: options.subject,
      body: {
        contentType: 'HTML',
        content: options.html,
      },
      toRecipients: recipients,
      replyTo: options.replyTo
        ? [
            {
              emailAddress: {
                address: options.replyTo,
              },
            },
          ]
        : undefined,
    },
    saveToSentItems: 'true',
  }

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  if (!res.ok) {
    const errorText = await res.text()
    console.error('❌ Microsoft Graph API sendMail error:', res.status, errorText)
    throw new Error(`Microsoft Graph sendMail failed (${res.status}): ${errorText}`)
  }

  return true
}

/**
 * Unified email sender:
 * 1. Checks for Microsoft 365 OAuth2 credentials first.
 * 2. If available & authorized, dispatches email via Microsoft Graph API.
 * 3. Otherwise, falls back to Nodemailer SMTP with credentials/App Password.
 */
export async function sendEnquiryEmail(options: MailOptions): Promise<void> {
  // Check if Microsoft OAuth2 credentials are configured
  const hasOAuth2Config =
    Boolean(process.env.MICROSOFT_CLIENT_ID) &&
    Boolean(process.env.MICROSOFT_CLIENT_SECRET) &&
    process.env.MICROSOFT_CLIENT_SECRET !== 'YOUR_CLIENT_SECRET'

  if (hasOAuth2Config) {
    const accessToken = await getMicrosoftOAuth2AccessToken()
    if (accessToken) {
      await sendViaMicrosoftGraph(accessToken, options)
      return
    }
  }

  // Fallback to Nodemailer SMTP
  const senderUser = process.env.SMTP_USER || DEFAULT_SMTP_USER
  const info = await transporter.sendMail({
    from: options.from || `"Travash Website" <${senderUser}>`,
    to: options.to,
    replyTo: options.replyTo,
    subject: options.subject,
    text: options.text,
    html: options.html,
    attachments: options.attachments,
  })
  console.log(`📧 Email dispatched via SMTP to ${options.to}. MessageID: ${info.messageId}`)
}

export default transporter
