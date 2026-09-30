'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import {
  Mail,
  Phone,
  Send,
  Sparkles,
  Lock,
} from 'lucide-react'
import { toast, Toaster } from 'sonner'
import OfficeLocations, { OfficeLocation } from './OfficeLocations'
import CountryPhoneInput from '@/components/ui/CountryPhoneInput'

interface ContactPageLayoutProps {
  email?: string
  phone?: string
  offices?: OfficeLocation[]
  socialLinks?: Array<{ platform: string; url: string }>
}

const INTEREST_TOPICS: string[] = []

export default function ContactPageLayout({
  email = 'contact@travash.com',
  phone = '(+91) 7416743434',
  offices,
  socialLinks,
}: ContactPageLayoutProps) {
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
      subject: formData.get('subject') || 'General Inquiry',
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
        toast.success(result.message || "Thank you! Our engineering team will be in touch shortly.", { duration: 5000 })
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

  return (
    <>
      <Toaster position="top-right" richColors />
      <section className="py-12 sm:py-16 lg:py-20 bg-white font-['Plus_Jakarta_Sans',sans-serif]">
        <div className="max-w-[80rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start max-w-6xl mx-auto">
            {/* Left Column: Direct Contact & Global Offices (order-2 on mobile, order-1 on desktop) */}
            <div className="order-2 lg:order-1 lg:col-span-5 space-y-8">
              <div>
                <span className="text-xs font-bold text-[#14B8A6] uppercase tracking-widest block mb-2">
                  DIRECT CONSULTATION CHANNELS
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B1E3D] tracking-tight mb-4">
                  Let&apos;s Build Something Extraordinary Together
                </h2>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  Whether you require dedicated agile squads, production AI integration, or an end-to-end cloud modernization architecture, our senior leaders are ready to assist.
                </p>
              </div>

              {/* Direct Info Cards */}
              <div className="space-y-3.5">
                <a
                  href={`mailto:${email}`}
                  className="flex items-center gap-4 p-4.5 rounded-2xl bg-[#F8FAFC] hover:bg-[#EEF4FB] border border-gray-200/80 hover:border-[#004771]/40 transition-all group shadow-2xs hover:shadow-xs"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#004771] to-[#0B4785] text-white flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform shadow-2xs">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div className="text-xs font-semibold text-gray-500">Email Our Team</div>
                      <span className="text-[10px] font-bold text-teal-600 bg-teal-50 px-2 py-0.5 rounded-md">
                        Fast Reply
                      </span>
                    </div>
                    <div className="text-sm sm:text-base font-bold text-[#0B1E3D] group-hover:text-[#004771] transition-colors truncate">
                      {email}
                    </div>
                  </div>
                </a>

                <a
                  href={`tel:${phone.replace(/[^\d+]/g, '')}`}
                  className="flex items-center gap-4 p-4.5 rounded-2xl bg-[#F8FAFC] hover:bg-[#EEF4FB] border border-gray-200/80 hover:border-[#14B8A6]/40 transition-all group shadow-2xs hover:shadow-xs"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#0D9488] to-[#14B8A6] text-white flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform shadow-2xs">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div className="text-xs font-semibold text-gray-500">Call Our Experts</div>
                      <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                        Mon - Fri
                      </span>
                    </div>
                    <div className="text-sm sm:text-base font-bold text-[#0B1E3D] group-hover:text-[#004771] transition-colors">
                      {phone}
                    </div>
                  </div>
                </a>
              </div>

              {/* Department & Specialized Contacts */}
              <div className="p-5 rounded-2xl bg-[#F8FAFC] border border-gray-200/90 space-y-3.5 shadow-2xs">
                <span className="text-[11px] font-bold text-[#004771] uppercase tracking-widest block mb-1">
                  Department &amp; Specialized Contacts
                </span>

                <div className="space-y-3">
                  {/* HR - Travash */}
                  <div className="p-3.5 rounded-xl bg-white border border-gray-200/80 hover:border-[#004771]/40 transition-all shadow-2xs group">
                    <div className="flex items-center justify-between gap-3 mb-2">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-10 h-10 rounded-lg bg-[#F0F7FF] border border-[#004771]/15 p-1.5 flex items-center justify-center flex-shrink-0">
                          <Image
                            src="/casestudy-img/New-latest-logo.svg"
                            alt="Travash Logo"
                            width={32}
                            height={32}
                            className="object-contain w-full h-full"
                          />
                        </div>
                        <div className="min-w-0">
                          <div className="text-xs font-extrabold text-[#0B1E3D] truncate">
                            HR &ndash; Travash
                          </div>
                          <div className="text-[11px] font-semibold text-[#004771]">
                            Human Resources &middot; Ravi
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-gray-100 text-xs text-gray-600 gap-2 flex-wrap">
                      <a
                        href="mailto:contact@travash.com"
                        className="hover:text-[#004771] flex items-center gap-1 text-[11px] font-medium"
                      >
                        <Mail className="w-3 h-3 text-gray-400" />
                        <span>contact@travash.com</span>
                      </a>
                      <a
                        href="tel:+917416743434"
                        className="font-bold text-[#004771] hover:underline flex items-center gap-1 text-xs"
                      >
                        <Phone className="w-3 h-3 text-[#004771]" />
                        <span>+91 7416743434</span>
                      </a>
                    </div>
                  </div>

                  {/* Recruitments - Travash */}
                  <div className="p-3.5 rounded-xl bg-white border border-gray-200/80 hover:border-[#0D9488]/40 transition-all shadow-2xs group">
                    <div className="flex items-center justify-between gap-3 mb-2">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-10 h-10 rounded-lg bg-[#F0F7FF] border border-[#004771]/15 p-1.5 flex items-center justify-center flex-shrink-0">
                          <Image
                            src="/casestudy-img/New-latest-logo.svg"
                            alt="Travash Logo"
                            width={32}
                            height={32}
                            className="object-contain w-full h-full"
                          />
                        </div>
                        <div className="min-w-0">
                          <div className="text-xs font-extrabold text-[#0B1E3D] truncate">
                              Talent Acquisition &middot; Sachin
                          </div>
                          <div className="text-[11px] font-semibold text-[#0D9488]">
                            Talent Acquisition &middot; Sachin
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-gray-100 text-xs text-gray-600 gap-2 flex-wrap">
                      <a
                        href="mailto:sachin@travash.com"
                        className="hover:text-[#0D9488] flex items-center gap-1 text-[11px] font-medium"
                      >
                        <Mail className="w-3 h-3 text-gray-400" />
                        <span>sachin@travash.com</span>
                      </a>
                      <a
                        href="tel:+918686907076"
                        className="font-bold text-[#0D9488] hover:underline flex items-center gap-1 text-xs"
                      >
                        <Phone className="w-3 h-3 text-[#0D9488]" />
                        <span>+91 8686907076</span>
                      </a>
                    </div>
                  </div>

                  {/* I4C Banks - Related Concerns */}
                  <div className="p-3.5 rounded-xl bg-white border border-gray-200/80 hover:border-[#D97706]/40 transition-all shadow-2xs group">
                    <div className="flex items-center justify-between gap-3 mb-2">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-10 h-10 rounded-lg bg-[#FFFBEB] border border-[#D97706]/20 p-1 flex items-center justify-center flex-shrink-0 overflow-hidden">
                          <Image
                            src="/images/services/i4c.png"
                            alt="I4C Indian Cyber Crime Coordination Centre Logo"
                            width={36}
                            height={36}
                            className="object-contain w-full h-full"
                          />
                        </div>
                        <div className="min-w-0">
                          <div className="text-xs font-extrabold text-[#0B1E3D] truncate">
                            I4C Banks &ndash; Related Concerns
                          </div>
                          <div className="text-[11px] font-semibold text-[#B45309]">
                            Indian Cyber Crime Coordination &middot; Supriya
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-gray-100 text-xs text-gray-600 gap-2 flex-wrap">
                      <span className="text-[11px] font-medium text-amber-800">
                        Cyber Fraud &amp; Bank Concerns
                      </span>
                      <a
                        href="tel:+919642922922"
                        className="font-bold text-[#B45309] hover:underline flex items-center gap-1 text-xs"
                      >
                        <Phone className="w-3 h-3 text-[#B45309]" />
                        <span>+91 9642922922</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Office Locations */}
              <OfficeLocations offices={offices} />
            </div>

            {/* Right Column: Interactive Contact Form (order-1 on mobile, order-2 on desktop) */}
            <div className="order-1 lg:order-2 lg:col-span-7">
              <div className="bg-[#F8FAFC] rounded-3xl p-6 sm:p-10 lg:p-12 shadow-[0_12px_40px_rgba(11,71,133,0.06)] border border-gray-200/90 relative overflow-hidden">
                {/* Decorative subtle accent gradient bar */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#004771] via-[#14B8A6] to-[#004771]" />

                <div className="mb-6">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#E0F2FE] text-[#004771] text-[11px] font-extrabold uppercase tracking-wider mb-2">
                    <Sparkles className="w-3 h-3 text-[#14B8A6]" />
                    <span>START A CONVERSATION</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0B1E3D] tracking-tight">
                    Tell Us About Your Project
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 mt-1.5">
                    Share your requirements and our solutions architect will formulate a customized technical roadmap.
                  </p>
                </div>

                <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                  {/* Honeypot field for bot spam protection */}
                  <div className="hidden" aria-hidden="true" style={{ display: 'none' }}>
                    <label htmlFor="contact-website">Website</label>
                    <input
                      id="contact-website"
                      name="website"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>

                  {/* Name & Phone */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contact-name" className="block text-xs font-bold text-gray-700 mb-1.5">
                        Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        required
                        placeholder="Enter Your Name"
                        className="w-full bg-white rounded-xl px-4 py-3 text-sm text-[#0B1E3D] placeholder:text-gray-400 border border-gray-200 focus:outline-none focus:border-[#004771] focus:ring-2 focus:ring-[#E0F2FE] transition-all shadow-2xs"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-phone" className="block text-xs font-bold text-gray-700 mb-1.5">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <CountryPhoneInput
                        id="contact-phone"
                        name="phone"
                        required
                        placeholder="98765 43210"
                      />
                    </div>
                  </div>

                  {/* Email & Subject */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contact-email" className="block text-xs font-bold text-gray-700 mb-1.5">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        required
                        placeholder="Enter Your Email"
                        className="w-full bg-white rounded-xl px-4 py-3 text-sm text-[#0B1E3D] placeholder:text-gray-400 border border-gray-200 focus:outline-none focus:border-[#004771] focus:ring-2 focus:ring-[#E0F2FE] transition-all shadow-2xs"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-subject" className="block text-xs font-bold text-gray-700 mb-1.5">
                        Subject
                      </label>
                      <input
                        id="contact-subject"
                        name="subject"
                        type="text"
                        placeholder="Enter Your Subject"
                        className="w-full bg-white rounded-xl px-4 py-3 text-sm text-[#0B1E3D] placeholder:text-gray-400 border border-gray-200 focus:outline-none focus:border-[#004771] focus:ring-2 focus:ring-[#E0F2FE] transition-all shadow-2xs"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="contact-message" className="block text-xs font-bold text-gray-700 mb-1.5">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={4}
                      required
                      placeholder="Enter Your Message..."
                      className="w-full bg-white rounded-xl px-4 py-3 text-sm text-[#0B1E3D] placeholder:text-gray-400 border border-gray-200 focus:outline-none focus:border-[#004771] focus:ring-2 focus:ring-[#E0F2FE] transition-all shadow-2xs resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-[#004771] to-[#0B4785] hover:from-[#02487D] hover:to-[#004771] text-white font-extrabold text-sm sm:text-base shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2.5 disabled:opacity-60 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                        Transmitting Inquiry...
                      </span>
                    ) : (
                      <>
                        <span>Submit Project Inquiry</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-center gap-2 text-xs text-gray-500 pt-1">
                    <Lock className="w-3.5 h-3.5 text-gray-400" />
                    <span>Your information is protected by 256-bit SSL encryption. Zero spam guaranteed.</span>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

