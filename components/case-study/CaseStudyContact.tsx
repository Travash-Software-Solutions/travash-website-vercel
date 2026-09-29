'use client'

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Toaster, toast } from 'sonner'
import CountryPhoneInput from '@/components/ui/CountryPhoneInput'

interface CaseStudyContactProps {
  heading?: string
  description?: string
}

export default function CaseStudyContact({
  heading = 'Ready to\nautomate and\nsolve operational\nbottlenecks?',
  description = 'At Travash, we engineer enterprise-grade AI and automation solutions that solve complex business challenges and streamline operations. Visit travash.com to connect with our digital transformation experts.',
}: CaseStudyContactProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(e.currentTarget)
    const payload = {
      name: formData.get('name'),
      phone: formData.get('phone'),
      email: formData.get('email'),
      subject: 'Case Study Inquiry: ' + heading.replace(/\n/g, ' '),
      message: formData.get('message'),
      website: formData.get('website'),
    }

    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const result = await res.json()

      if (res.ok && result.success !== false) {
        toast.success(result.message || "Thank you! We'll be in touch shortly.", { duration: 5000 })
        formRef.current?.reset()
      } else {
        toast.error(result.message || result.error || 'Something went wrong. Please try again.')
      }
    } catch {
      toast.error('Network error. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const headingLines = heading.split('\n')

  return (
    <section id="contact" className="py-12 sm:py-16 bg-white font-['Plus_Jakarta_Sans',sans-serif] overflow-hidden">
      <Toaster position="top-right" richColors />
      <div className="max-w-[80rem] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Soft Lavender / Periwinkle Container Card matching Screenshot 2 */}
        <div className="bg-[#F8F5FD] rounded-[32px] p-8 sm:p-12 lg:p-16 border border-gray-100">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-center">
            {/* Left Column: Display Title & Description */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-6"
            >
              <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-bold text-[#0F172A] tracking-[-1px] leading-[1.12] mb-5">
                {headingLines.map((line, idx) => (
                  <span key={idx} className="block">
                    {line}
                  </span>
                ))}
              </h2>
              <p className="text-xs sm:text-[13px] text-[#475569] leading-relaxed font-normal max-w-md">
                {description}
              </p>
            </motion.div>

            {/* Right Column: Clean White Form Card matching Screenshot 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-6"
            >
              <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-xs border border-gray-100 w-full">
                <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-2">
                  {/* Honeypot field for bot spam protection */}
                  <div className="hidden" aria-hidden="true" style={{ display: 'none' }}>
                    <label htmlFor="cs-website">Website</label>
                    <input
                      id="cs-website"
                      name="website"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>

                  {/* Name */}
                  <div className="flex flex-col gap-0.5">
                    <label htmlFor="cs-name" className="text-[10px] font-semibold text-gray-600">
                      Name
                    </label>
                    <input
                      id="cs-name"
                      name="name"
                      type="text"
                      required
                      placeholder="Enter Name"
                      className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2.5 text-xs text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-[#003865] transition-colors"
                    />
                  </div>

                  {/* Phone */}
                  <div className="flex flex-col gap-0.5">
                    <label htmlFor="cs-phone" className="text-[10px] font-semibold text-gray-600">
                      Phone Number
                    </label>
                    <CountryPhoneInput
                      id="cs-phone"
                      name="phone"
                      placeholder="98765 43210"
                    />
                  </div>

                  {/* Email */}
                  <div className="flex flex-col gap-0.5">
                    <label htmlFor="cs-email" className="text-[10px] font-semibold text-gray-600">
                      Email
                    </label>
                    <input
                      id="cs-email"
                      name="email"
                      type="email"
                      required
                      placeholder="Enter Email"
                      className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2.5 text-xs text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-[#003865] transition-colors"
                    />
                  </div>

                  {/* Message */}
                  <div className="flex flex-col gap-0.5">
                    <label htmlFor="cs-message" className="text-[10px] font-semibold text-gray-600">
                      Message
                    </label>
                    <textarea
                      id="cs-message"
                      name="message"
                      rows={2}
                      required
                      placeholder="Enter Message"
                      className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2.5 text-xs text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-[#003865] resize-none transition-colors"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#003865] hover:bg-[#002847] disabled:bg-gray-400 text-white font-semibold py-2.5 rounded-xl text-xs uppercase tracking-wider transition-colors shadow-xs mt-1"
                  >
                    {isSubmitting ? 'Submitting...' : 'SUBMIT'}
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
