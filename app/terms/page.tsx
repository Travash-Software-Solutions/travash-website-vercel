import { Metadata } from 'next'
import Link from 'next/link'
import { ShieldCheck, FileText, Lock, Scale, HelpCircle, ArrowRight } from 'lucide-react'
import Navbar from '@/components/sections/Navbar'
import Footer from '@/components/sections/Footer'
import Contact from '@/components/sections/Contact'
import { client } from '@/lib/sanity'
import { homePageQuery } from '@/lib/queries'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata: Metadata = {
  title: 'Terms & Conditions | Travash Software Solutions',
  description:
    'Comprehensive Terms and Conditions governing the use of Travash Software Solutions website, digital products, consulting services, and software platforms.',
}

async function getSettings() {
  try {
    const data = await client.fetch(homePageQuery)
    return data?.siteSettings || null
  } catch {
    return null
  }
}

export default async function TermsPage() {
  const siteSettings = await getSettings()

  return (
    <>
      <Navbar settings={siteSettings} />
      <main className="bg-[#F8FAFC] min-h-screen font-['Plus_Jakarta_Sans',sans-serif] text-gray-800">
        {/* Hero Banner */}
        <section className="bg-gradient-to-b from-[#063057] to-[#0B4785] text-white py-16 sm:py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-blue-200 text-xs font-semibold uppercase tracking-wider mb-4 backdrop-blur-sm border border-white/15">
              <Scale className="w-3.5 h-3.5 text-blue-300" />
              <span>Legal Governance</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4 text-white">
              Terms &amp; Conditions
            </h1>
            <p className="text-blue-100/90 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              These terms govern your access to and use of Travash Software Solutions Pvt. Ltd.&apos;s website, software engineering services, and digital consultation platforms.
            </p>
            <div className="mt-6 text-xs text-blue-200/80 font-medium">
              Effective Date: September 30, 2026 &bull; Travash Software Solutions Pvt. Ltd.
            </div>
          </div>
        </section>

        {/* Content Body */}
        <section className="py-12 sm:py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl p-6 sm:p-10 lg:p-12 shadow-sm border border-gray-200/80 space-y-10">
              
              {/* Introduction */}
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#0B4785] mb-3 flex items-center gap-2.5">
                  <FileText className="w-5 h-5 text-[#0B4785]" />
                  <span>1. Agreement to Terms</span>
                </h2>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                  By visiting, browsing, or utilizing the website <strong>travash.com</strong> or engaging with Travash Software Solutions Pvt. Ltd. (&quot;Travash&quot;, &quot;Company&quot;, &quot;we&quot;, &quot;our&quot;, or &quot;us&quot;), you acknowledge that you have read, understood, and agreed to be bound by these Terms &amp; Conditions. If you do not agree to these terms, you must refrain from using our website and services immediately.
                </p>
              </div>

              {/* Scope of Engineering & Consulting Services */}
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#0B4785] mb-3 flex items-center gap-2.5">
                  <ShieldCheck className="w-5 h-5 text-[#0B4785]" />
                  <span>2. Services &amp; Enterprise Engagement</span>
                </h2>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base mb-3">
                  Travash provides enterprise software engineering, AI acceleration, custom application development, cloud architecture, and dedicated development teams. Specific client engagements, deliverables, milestones, and service level agreements (SLAs) are executed via distinct Master Services Agreements (MSAs) and Statements of Work (SOWs).
                </p>
                <ul className="list-disc pl-5 text-gray-600 space-y-2 text-sm sm:text-base">
                  <li>Consultation forms submitted on this website do not constitute a binding engagement until an official SOW is executed.</li>
                  <li>Quotes and estimates provided via website inquiries are indicative and subject to formal discovery and scoping.</li>
                </ul>
              </div>

              {/* Intellectual Property Rights */}
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#0B4785] mb-3 flex items-center gap-2.5">
                  <Lock className="w-5 h-5 text-[#0B4785]" />
                  <span>3. Intellectual Property Rights</span>
                </h2>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base mb-3">
                  All digital assets published on this site—including but not limited to brand identity, source code, UI designs, case studies, graphics, logos, whitepapers, and software solution framework concepts—are the exclusive intellectual property of Travash Software Solutions Pvt. Ltd.
                </p>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                  You are granted a limited, non-exclusive, non-transferable license to access and view the website content strictly for informational purposes. Reproduction, distribution, reverse-engineering, or unauthorized scraping of content without prior written consent is strictly prohibited.
                </p>
              </div>

              {/* User Conduct & Form Submissions */}
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#0B4785] mb-3 flex items-center gap-2.5">
                  <Scale className="w-5 h-5 text-[#0B4785]" />
                  <span>4. Acceptable Conduct &amp; Anti-Spam Guard</span>
                </h2>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base mb-3">
                  When submitting inquiries through our contact forms, careers portal, or service calculators, you agree to:
                </p>
                <ul className="list-disc pl-5 text-gray-600 space-y-2 text-sm sm:text-base">
                  <li>Provide truthful, accurate, and non-deceptive corporate and contact information.</li>
                  <li>Refrain from transmitting automated bot submissions, spam, malicious code, or illegal content.</li>
                  <li>Not attempt to disrupt or impair the security, availability, or integrity of our web servers and APIs.</li>
                </ul>
              </div>

              {/* Disclaimers & Limitation of Liability */}
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#0B4785] mb-3 flex items-center gap-2.5">
                  <HelpCircle className="w-5 h-5 text-[#0B4785]" />
                  <span>5. Limitation of Liability</span>
                </h2>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                  Travash Software Solutions provides this website on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; basis. In no event shall Travash, its directors, employees, or partners be liable for any indirect, incidental, consequential, or punitive damages arising out of your access to or inability to use this website.
                </p>
              </div>

              {/* Governing Law & Dispute Resolution */}
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#0B4785] mb-3">
                  6. Governing Law &amp; Jurisdiction
                </h2>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                  These Terms &amp; Conditions shall be governed by and construed in accordance with the laws of India. Any legal disputes arising hereunder shall be subject to the exclusive jurisdiction of the competent courts located in Hyderabad, Telangana, India.
                </p>
              </div>

              {/* Contact Box */}
              <div className="bg-[#F0F5FF] border border-[#D6E4FF] rounded-xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-8">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Have Questions About Our Terms?</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Reach out to our legal and compliance advisory team.
                  </p>
                </div>
                <Link
                  href="/contact-us"
                  className="inline-flex items-center justify-center bg-[#0B4785] hover:bg-[#083566] text-white font-semibold px-6 py-3 rounded-lg text-sm transition-all duration-200 shadow-sm shrink-0"
                >
                  <span>Contact Legal Team</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>

            </div>
          </div>
        </section>

        {/* Inquiry Form Section */}
        <Contact
          data={{
            heading: 'Have Questions About Our Terms?',
            subheading: 'Reach out to our team or submit your inquiry below and we will get back to you promptly.',
            submitLabel: 'Send Inquiry',
          }}
        />
      </main>
      <Footer settings={siteSettings} />
    </>
  )
}
