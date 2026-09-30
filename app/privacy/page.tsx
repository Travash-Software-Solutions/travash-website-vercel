import { Metadata } from 'next'
import Navbar from '@/components/sections/Navbar'
import Footer from '@/components/sections/Footer'
import { client } from '@/lib/sanity'
import { homePageQuery } from '@/lib/queries'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata: Metadata = {
  title: 'Privacy Policy | Travash Software Solutions',
  description: 'Privacy Policy describing how Travash Software Solutions collects, protects, and uses client and visitor information.',
}

async function getSettings() {
  try {
    const data = await client.fetch(homePageQuery)
    return data?.siteSettings || null
  } catch {
    return null
  }
}

export default async function PrivacyPage() {
  const siteSettings = await getSettings()

  return (
    <>
      <Navbar settings={siteSettings} />
      <main className="bg-white min-h-screen font-['Plus_Jakarta_Sans',sans-serif] py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0B4785] mb-6 tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-sm text-gray-500 mb-10 border-b border-gray-200 pb-4">
            Last Updated: September 30, 2026 &bull; Travash Software Solutions Pvt. Ltd.
          </p>

          <div className="prose prose-blue max-w-none text-gray-700 space-y-6 text-sm sm:text-base leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-2">1. Overview</h2>
              <p>
                At Travash Software Solutions, we prioritize your data privacy and security. This Privacy Policy explains what information we collect, how we process and protect it, and your rights regarding your personal data.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-2">2. Data We Collect</h2>
              <p>
                When you submit an inquiry or contact form, we collect information such as your name, corporate email address, phone number, company name, and project description. We use this data solely to respond to your technical consultation requests.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-2">3. Data Protection &amp; Confidentiality</h2>
              <p>
                We do not sell, rent, or lease your personal information to third parties. All client submissions are encrypted in transit and handled with strict confidentiality adhering to global data protection standards.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-2">4. Cookies &amp; Analytics</h2>
              <p>
                Our website uses basic analytics and essential cookies to monitor website performance and improve user experience. You can manage or disable cookies via your browser settings.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-2">5. Contact Us</h2>
              <p>
                If you have any questions or privacy concerns, feel free to email our Data Protection Officer at{' '}
                <a href="mailto:contact@travash.com" className="text-[#0B4785] font-semibold hover:underline">
                  contact@travash.com
                </a>.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer settings={siteSettings} />
    </>
  )
}
