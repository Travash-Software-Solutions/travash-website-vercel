import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { sendEnquiryEmail } from '@/lib/mailer'
import { writeClient } from '@/lib/sanity'
import { NOTIFICATION_RECIPIENTS, generateMinimalEnquiryEmailHtml, generateUserThankYouEmailHtml } from '@/lib/email-templates'

export const runtime = 'nodejs'

const enquirySchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters').max(100, 'Name cannot exceed 100 characters'),
  email: z.string().trim().email('Invalid email address').max(200, 'Email cannot exceed 200 characters'),
  phone: z.string().trim().max(80, 'Phone cannot exceed 80 characters').optional().nullable(),
  company: z.string().trim().max(100, 'Company cannot exceed 100 characters').optional().nullable(),
  subject: z.string().trim().max(200, 'Subject cannot exceed 200 characters').optional().nullable(),
  message: z.string().trim().min(5, 'Message must be at least 5 characters').max(5000, 'Message cannot exceed 5000 characters'),
  website: z.string().optional().nullable(), // Honeypot anti-spam field
  fax: z.string().optional().nullable(),     // Secondary honeypot field
})

// ----------------------------------------------------------------------
// ANTI-SPAM SECURITY GUARD LAYER
// ----------------------------------------------------------------------

// 1. In-Memory Rate Limiter (Max 4 requests per 15 mins per IP)
const ipRateLimitMap = new Map<string, { count: number; firstTimestamp: number }>()

function isIpRateLimited(ip: string): boolean {
  const now = Date.now()
  const windowMs = 15 * 60 * 1000 // 15 minutes
  const maxRequests = 4

  const record = ipRateLimitMap.get(ip)
  if (!record) {
    ipRateLimitMap.set(ip, { count: 1, firstTimestamp: now })
    return false
  }

  if (now - record.firstTimestamp > windowMs) {
    ipRateLimitMap.set(ip, { count: 1, firstTimestamp: now })
    return false
  }

  record.count += 1
  return record.count > maxRequests
}

// 2. Disposable Email Domain Blocklist
const DISPOSABLE_EMAIL_DOMAINS = new Set([
  'mailinator.com',
  'tempmail.com',
  'guerrillamail.com',
  '10minutemail.com',
  'dispostable.com',
  'throwawaymail.com',
  'trashmail.com',
  'sharklasers.com',
  'getairmail.com',
  'yopmail.com',
  'maildrop.cc',
  'nada.ltd',
  'mohmal.com',
  'temp-mail.org',
  'fakeinbox.com',
  'emailondeck.com',
  'mytemp.email',
  'guerrillamailblock.com',
])

function isDisposableEmail(email: string): boolean {
  const domain = email.split('@')[1]?.toLowerCase()
  return domain ? DISPOSABLE_EMAIL_DOMAINS.has(domain) : false
}

// 3. Spam Content & Keyword Filter
const SPAM_KEYWORDS = [
  'casino',
  'poker',
  'gambling',
  'viagra',
  'cialis',
  'pharmacy online',
  'buy backlinks',
  'rank #1',
  'rank 1 on google',
  'seo audit link',
  'crypto giveaway',
  'bitcoin profit',
  'binary options',
  'telegram group',
  'whatsapp group link',
  'adult dating',
]

function isSpamContent(name: string, subject: string, message: string): boolean {
  const fullContent = `${name} ${subject} ${message}`.toLowerCase()

  for (const kw of SPAM_KEYWORDS) {
    if (fullContent.includes(kw)) return true
  }

  const urlMatches = message.match(/https?:\/\/[^\s]+/g)
  if (urlMatches && urlMatches.length > 2) return true

  return false
}

// ----------------------------------------------------------------------
// POST ROUTE HANDLER
// ----------------------------------------------------------------------

export async function POST(request: NextRequest) {
  try {
    const clientIp =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      request.headers.get('x-real-ip') ||
      '127.0.0.1'

    if (isIpRateLimited(clientIp)) {
      console.warn(`🛡️ Rate limit exceeded for IP: ${clientIp}`)
      return NextResponse.json(
        {
          success: false,
          error: 'Too many requests. Please wait a few minutes before trying again.',
          message: 'Too many requests. Please wait a few minutes before trying again.',
        },
        { status: 429 }
      )
    }

    const rawBody = await request.json()
    const validated = enquirySchema.parse(rawBody)

    // Honeypot spam check: if hidden fields website or fax are filled, silently drop
    if (
      (validated.website && validated.website.trim().length > 0) ||
      (validated.fax && validated.fax.trim().length > 0)
    ) {
      console.warn('🛡️ Honeypot triggered. Silently dropping bot submission.')
      return NextResponse.json({
        success: true,
        message: 'Your enquiry has been received successfully.',
      })
    }

    const { name, email, phone, company, subject, message } = validated

    if (isDisposableEmail(email)) {
      console.warn(`🛡️ Disposable email blocked: ${email}`)
      return NextResponse.json(
        {
          success: false,
          error: 'Please submit a valid corporate or personal email address.',
          message: 'Please submit a valid corporate or personal email address.',
        },
        { status: 400 }
      )
    }

    if (isSpamContent(name, subject || '', message)) {
      console.warn(`🛡️ Spam content filter triggered for submission from ${email}`)
      return NextResponse.json({
        success: true,
        message: 'Your enquiry has been received successfully.',
      })
    }

    let sanitySaved = false

    // 1. SAVE SUBMISSION TO SANITY CMS LISTING
    if (writeClient) {
      try {
        await writeClient.create({
          _type: 'enquirySubmission',
          name,
          email,
          phone: phone || '',
          company: company || '',
          subject: subject || 'General Website Enquiry',
          message,
          clientIp,
          submittedAt: new Date().toISOString(),
          status: 'New',
        })
        sanitySaved = true
        console.log(`✅ Saved enquiry submission from ${email} to Sanity CMS.`)
      } catch (sanityErr) {
        console.warn('⚠️ Sanity CMS write warning:', sanityErr)
      }
    }

    // 2. DISPATCH MINIMAL HTML EMAIL WITH TRAVASH LOGO
    const recipientEmails = NOTIFICATION_RECIPIENTS
    const smtpUser = process.env.SMTP_USER || 'leads.travash@gmail.com'
    const emailSubject = `New Website Enquiry - ${name}${subject ? ` (${subject})` : ''}`

    const plainTextMessage = [
      '==============================================',
      'NEW WEBSITE CONSULTATION ENQUIRY - TRAVASH SOFTWARE',
      '==============================================',
      `Name:    ${name}`,
      `Email:   ${email}`,
      phone ? `Phone:   ${phone}` : null,
      company ? `Company: ${company}` : null,
      subject ? `Subject: ${subject}` : null,
      `IP:      ${clientIp}`,
      '----------------------------------------------',
      'Message:',
      message,
      '==============================================',
      `Sent via Travash Website Contact Form • Reply to this email will go directly to ${email}`,
    ]
      .filter(Boolean)
      .join('\n')

    const htmlMessage = generateMinimalEnquiryEmailHtml({
      name,
      email,
      phone,
      company,
      subject,
      message,
      clientIp,
    })

    try {
      await sendEnquiryEmail({
        from: `"Travash Website" <${smtpUser}>`,
        to: recipientEmails,
        replyTo: email,
        subject: emailSubject,
        text: plainTextMessage,
        html: htmlMessage,
      })
      console.log(`📧 Notification email sent to ${recipientEmails}`)

      // 3. SEND AUTOMATED THANK YOU CONFIRMATION EMAIL TO THE USER
      const userThankYouHtml = generateUserThankYouEmailHtml({
        name,
        type: 'enquiry',
      })

      await sendEnquiryEmail({
        from: `"Travash Software Solutions" <${smtpUser}>`,
        to: email,
        subject: 'Thank you for reaching out to Travash Software',
        text: `Hi ${name},\n\nThank you for reaching out to Travash Software Solutions! We have successfully received your enquiry and our engineering advisory team will get in touch with you within 24 business hours.\n\nWarm regards,\nTravash Software Solutions Team\nwww.travash.com`,
        html: userThankYouHtml,
      })
      console.log(`📧 User thank-you confirmation sent to ${email}`)
    } catch (mailErr) {
      console.warn('⚠️ Email dispatch warning (submission still saved):', mailErr)
    }

    return NextResponse.json({
      success: true,
      message: 'Thank you! Your enquiry has been received and our team will get in touch shortly.',
    })
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      const firstError = error.issues[0]?.message || 'Invalid form submission'
      return NextResponse.json(
        {
          success: false,
          error: firstError,
          message: firstError,
        },
        { status: 400 }
      )
    }

    const err = error as { code?: string; responseCode?: number; message?: string }
    console.error('❌ Error sending enquiry email:', {
      code: err?.code,
      responseCode: err?.responseCode,
      message: err?.message,
    })

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to send enquiry. Please try again later or contact us directly.',
        message: 'Failed to send enquiry. Please try again later or contact us directly.',
      },
      { status: 500 }
    )
  }
}

