export const NOTIFICATION_RECIPIENTS = [
  'contact@travash.com',
  'imran@travash.com',
  'Ravi.belpade@travash.com',
  'leads.travash@gmail.com',
].join(', ')

export const TRAVASH_LOGO_URL = 'https://travash.com/travash-latest-logo.svg'

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

// Fixed mobile logo HTML snippet with explicit max-width and inline constraints
const LOGO_HTML_SNIPPET = `<img src="${TRAVASH_LOGO_URL}" alt="Travash Software" width="120" style="width: 120px !important; max-width: 120px !important; height: auto !important; border: 0; display: block; outline: none; margin: 0;" />`

export interface MinimalEnquiryEmailProps {
  name: string
  email: string
  phone?: string | null
  company?: string | null
  subject?: string | null
  message: string
  clientIp?: string
}

export function generateMinimalEnquiryEmailHtml({
  name,
  email,
  phone,
  company,
  subject,
  message,
  clientIp = 'N/A',
}: MinimalEnquiryEmailProps): string {
  const safeName = escapeHtml(name)
  const safeEmail = escapeHtml(email)
  const safePhone = phone ? escapeHtml(phone) : null
  const safeCompany = company ? escapeHtml(company) : null
  const safeSubject = subject ? escapeHtml(subject) : 'Website Consultation Request'
  const safeMessage = escapeHtml(message).replace(/\n/g, '<br />')

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>New Website Enquiry</title>
</head>
<body style="margin: 0; padding: 24px 12px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #F8FAFC; color: #0F172A;">
  <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 580px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #E2E8F0; box-shadow: 0 4px 20px rgba(0,0,0,0.04);">
    
    <!-- Top Minimal Header with Mobile-Optimized Logo -->
    <tr>
      <td style="padding: 24px 28px 18px 28px; border-bottom: 1px solid #F1F5F9;">
        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td style="vertical-align: middle; width: 130px;">
              ${LOGO_HTML_SNIPPET}
            </td>
            <td style="text-align: right; vertical-align: middle;">
              <span style="font-size: 10px; font-weight: 700; color: #004771; text-transform: uppercase; letter-spacing: 1px; background-color: #E0F2FE; padding: 4px 10px; border-radius: 20px; display: inline-block;">
                NEW ENQUIRY
              </span>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- Card Content -->
    <tr>
      <td style="padding: 24px 28px;">
        <h2 style="margin: 0 0 16px 0; font-size: 17px; font-weight: 800; color: #0B1E3D; letter-spacing: -0.3px;">
          ${safeSubject}
        </h2>

        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="border-collapse: collapse; margin-bottom: 20px;">
          <tr>
            <td style="padding: 8px 0; color: #64748B; font-size: 13px; font-weight: 600; width: 120px; border-bottom: 1px solid #F1F5F9;">Client Name</td>
            <td style="padding: 8px 0; color: #0F172A; font-size: 14px; font-weight: 700; border-bottom: 1px solid #F1F5F9;">${safeName}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #64748B; font-size: 13px; font-weight: 600; border-bottom: 1px solid #F1F5F9;">Email Address</td>
            <td style="padding: 8px 0; font-size: 14px; border-bottom: 1px solid #F1F5F9;">
              <a href="mailto:${safeEmail}" style="color: #004771; font-weight: 700; text-decoration: none;">${safeEmail}</a>
            </td>
          </tr>
          ${
            safePhone
              ? `<tr>
                  <td style="padding: 8px 0; color: #64748B; font-size: 13px; font-weight: 600; border-bottom: 1px solid #F1F5F9;">Phone Number</td>
                  <td style="padding: 8px 0; color: #0F172A; font-size: 14px; font-weight: 600; border-bottom: 1px solid #F1F5F9;">${safePhone}</td>
                </tr>`
              : ''
          }
          ${
            safeCompany
              ? `<tr>
                  <td style="padding: 8px 0; color: #64748B; font-size: 13px; font-weight: 600; border-bottom: 1px solid #F1F5F9;">Company</td>
                  <td style="padding: 8px 0; color: #0F172A; font-size: 14px; font-weight: 600; border-bottom: 1px solid #F1F5F9;">${safeCompany}</td>
                </tr>`
              : ''
          }
        </table>

        <!-- Message Box -->
        <div style="margin-bottom: 20px;">
          <span style="display: block; font-size: 11px; font-weight: 700; color: #64748B; text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 6px;">
            PROJECT DETAILS / MESSAGE
          </span>
          <div style="background-color: #F8FAFC; border: 1px solid #E2E8F0; border-left: 3px solid #004771; border-radius: 8px; padding: 14px; font-size: 13px; line-height: 1.6; color: #1E293B;">
            ${safeMessage}
          </div>
        </div>

        <!-- Footer Strip -->
        <div style="padding-top: 14px; border-top: 1px solid #F1F5F9; font-size: 11px; color: #64748B; text-align: center; line-height: 1.5;">
          Sent via Travash Website &bull; Direct Reply: <a href="mailto:${safeEmail}" style="color: #004771; font-weight: 600; text-decoration: none;">${safeEmail}</a><br />
          <span style="color: #94A3B8;">Client IP: ${clientIp} &bull; Protected by Anti-Spam Guard</span>
        </div>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim()
}

export interface MinimalJobApplicationEmailProps {
  name: string
  email: string
  phone: string
  jobTitle: string
  jobSlug: string
  coverLetter: string
  resumeFileName?: string
}

export function generateMinimalJobApplicationEmailHtml({
  name,
  email,
  phone,
  jobTitle,
  jobSlug,
  coverLetter,
  resumeFileName,
}: MinimalJobApplicationEmailProps): string {
  const safeName = escapeHtml(name)
  const safeEmail = escapeHtml(email)
  const safePhone = escapeHtml(phone)
  const safeJobTitle = escapeHtml(jobTitle)
  const safeCoverLetter = escapeHtml(coverLetter).replace(/\n/g, '<br />')
  const safeResume = resumeFileName ? escapeHtml(resumeFileName) : null

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>New Job Application</title>
</head>
<body style="margin: 0; padding: 24px 12px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #F8FAFC; color: #0F172A;">
  <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 580px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #E2E8F0; box-shadow: 0 4px 20px rgba(0,0,0,0.04);">
    
    <!-- Top Minimal Header with Mobile-Optimized Logo -->
    <tr>
      <td style="padding: 24px 28px 18px 28px; border-bottom: 1px solid #F1F5F9;">
        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td style="vertical-align: middle; width: 130px;">
              ${LOGO_HTML_SNIPPET}
            </td>
            <td style="text-align: right; vertical-align: middle;">
              <span style="font-size: 10px; font-weight: 700; color: #0D9488; text-transform: uppercase; letter-spacing: 1px; background-color: #CCFBF1; padding: 4px 10px; border-radius: 20px; display: inline-block;">
                CAREERS
              </span>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- Card Content -->
    <tr>
      <td style="padding: 24px 28px;">
        <h2 style="margin: 0 0 6px 0; font-size: 17px; font-weight: 800; color: #0B1E3D; letter-spacing: -0.3px;">
          New Job Application: ${safeJobTitle}
        </h2>
        <p style="margin: 0 0 16px 0; font-size: 12px; color: #64748B;">
          Candidate applied for position via Travash Careers portal.
        </p>

        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="border-collapse: collapse; margin-bottom: 20px;">
          <tr>
            <td style="padding: 8px 0; color: #64748B; font-size: 13px; font-weight: 600; width: 130px; border-bottom: 1px solid #F1F5F9;">Candidate Name</td>
            <td style="padding: 8px 0; color: #0F172A; font-size: 14px; font-weight: 700; border-bottom: 1px solid #F1F5F9;">${safeName}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #64748B; font-size: 13px; font-weight: 600; border-bottom: 1px solid #F1F5F9;">Email Address</td>
            <td style="padding: 8px 0; font-size: 14px; border-bottom: 1px solid #F1F5F9;">
              <a href="mailto:${safeEmail}" style="color: #004771; font-weight: 700; text-decoration: none;">${safeEmail}</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #64748B; font-size: 13px; font-weight: 600; border-bottom: 1px solid #F1F5F9;">Phone Number</td>
            <td style="padding: 8px 0; color: #0F172A; font-size: 14px; font-weight: 700; border-bottom: 1px solid #F1F5F9;">${safePhone}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #64748B; font-size: 13px; font-weight: 600; border-bottom: 1px solid #F1F5F9;">Position Applied</td>
            <td style="padding: 8px 0; color: #004771; font-size: 14px; font-weight: 700; border-bottom: 1px solid #F1F5F9;">${safeJobTitle} (${jobSlug})</td>
          </tr>
          ${
            safeResume
              ? `<tr>
                  <td style="padding: 8px 0; color: #64748B; font-size: 13px; font-weight: 600; border-bottom: 1px solid #F1F5F9;">Attached Resume</td>
                  <td style="padding: 8px 0; color: #0F172A; font-size: 13px; font-weight: 600; border-bottom: 1px solid #F1F5F9;">📎 ${safeResume}</td>
                </tr>`
              : ''
          }
        </table>

        <!-- Cover Letter Box -->
        <div style="margin-bottom: 20px;">
          <span style="display: block; font-size: 11px; font-weight: 700; color: #64748B; text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 6px;">
            COVER LETTER / APPLICANT NOTE
          </span>
          <div style="background-color: #F8FAFC; border: 1px solid #E2E8F0; border-left: 3px solid #14B8A6; border-radius: 8px; padding: 14px; font-size: 13px; line-height: 1.6; color: #1E293B;">
            ${safeCoverLetter}
          </div>
        </div>

        <!-- Footer Strip -->
        <div style="padding-top: 14px; border-top: 1px solid #F1F5F9; font-size: 11px; color: #64748B; text-align: center; line-height: 1.5;">
          Sent via Travash Careers Portal &bull; Direct Reply: <a href="mailto:${safeEmail}" style="color: #004771; font-weight: 600; text-decoration: none;">${safeEmail}</a>
        </div>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim()
}

export interface UserThankYouEmailProps {
  name: string
  type?: 'enquiry' | 'career'
  jobTitle?: string
}

export function generateUserThankYouEmailHtml({
  name,
  type = 'enquiry',
  jobTitle,
}: UserThankYouEmailProps): string {
  const safeName = escapeHtml(name)
  const safeJobTitle = jobTitle ? escapeHtml(jobTitle) : ''

  const isCareer = type === 'career'

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Thank You - Travash Software Solutions</title>
</head>
<body style="margin: 0; padding: 24px 12px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #F8FAFC; color: #0F172A;">
  <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 580px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #E2E8F0; box-shadow: 0 4px 20px rgba(0,0,0,0.04);">
    
    <!-- Top Minimal Header with Mobile-Optimized Logo -->
    <tr>
      <td style="padding: 24px 28px; border-bottom: 1px solid #F1F5F9; text-align: left;">
        ${LOGO_HTML_SNIPPET}
      </td>
    </tr>

    <!-- Body Content -->
    <tr>
      <td style="padding: 28px 28px 24px 28px;">
        <h2 style="margin: 0 0 12px 0; font-size: 19px; font-weight: 800; color: #0B1E3D; letter-spacing: -0.3px;">
          Thank You, ${safeName}!
        </h2>

        <p style="margin: 0 0 16px 0; font-size: 14px; line-height: 1.65; color: #334155;">
          ${
            isCareer
              ? `Thank you for applying for the <strong>${safeJobTitle}</strong> position at Travash Software Solutions! We have successfully received your application and CV.`
              : `Thank you for reaching out to Travash Software Solutions! We have successfully received your consultation inquiry.`
          }
        </p>

        <div style="background-color: #F0FDF4; border: 1px solid #DCFCE7; border-radius: 10px; padding: 16px; margin: 20px 0;">
          <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
            <tr>
              <td style="font-size: 13px; font-weight: 700; color: #166534; line-height: 1.5;">
                ✅ Next Steps: Our ${
                  isCareer ? 'Talent Acquisition Team' : 'Engineering & Advisory Team'
                } is currently reviewing your submission and will get in touch with you within 24 business hours.
              </td>
            </tr>
          </table>
        </div>

        <p style="margin: 0 0 20px 0; font-size: 13px; line-height: 1.6; color: #64748B;">
          If you need immediate assistance or have additional details to share, feel free to reply directly to this email or reach us at <a href="mailto:contact@travash.com" style="color: #004771; font-weight: 600; text-decoration: none;">contact@travash.com</a>.
        </p>

        <div style="padding-top: 18px; border-top: 1px solid #F1F5F9; font-size: 13px; color: #0B1E3D; font-weight: 700;">
          Warm regards,<br />
          <span style="font-size: 12px; font-weight: 600; color: #64748B;">Travash Software Solutions Team</span><br />
          <a href="https://travash.com" style="font-size: 12px; color: #004771; text-decoration: none;">www.travash.com</a>
        </div>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim()
}
