'use client'

import { useState, useRef } from 'react'
import { Upload, Send, CheckCircle2, AlertCircle } from 'lucide-react'
import { toast } from 'sonner'
import CountryPhoneInput from '@/components/ui/CountryPhoneInput'

interface JobApplicationFormProps {
  jobTitle: string
  jobSlug: string
}

export default function JobApplicationForm({ jobTitle, jobSlug }: JobApplicationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [fileName, setFileName] = useState<string>('')
  const formRef = useRef<HTMLFormElement>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(e.currentTarget)
    formData.append('jobTitle', jobTitle)
    formData.append('jobSlug', jobSlug)

    try {
      const res = await fetch('/api/apply', {
        method: 'POST',
        body: formData,
      })

      if (res.ok) {
        toast.success(`Thank you! Your application for "${jobTitle}" has been submitted. Our talent acquisition team will review your profile shortly.`, {
          duration: 6000,
        })
        formRef.current?.reset()
        setFileName('')
      } else {
        const data = await res.json()
        toast.error(data.error || 'Failed to submit application. Please check the fields and try again.')
      }
    } catch {
      toast.error('Network error. Please try again or email your CV to contact@travash.com.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-md font-['Plus_Jakarta_Sans',sans-serif]">
      <div className="mb-6">
        <h3 className="text-xl font-extrabold text-[#121212] mb-1">Apply for this Position</h3>
        <p className="text-xs sm:text-sm text-gray-500">
          Role: <span className="font-semibold text-[#004771]">{jobTitle}</span>
        </p>
      </div>

      <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
        {/* Full Name */}
        <div>
          <label htmlFor="applicant-name" className="block text-xs font-semibold text-gray-700 mb-1">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            id="applicant-name"
            name="name"
            type="text"
            required
            placeholder="e.g. Rahul Sharma"
            className="w-full px-3.5 py-2.5 bg-[#F8FAFC] border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#004771] focus:bg-white transition-all"
          />
        </div>

        {/* Email Address */}
        <div>
          <label htmlFor="applicant-email" className="block text-xs font-semibold text-gray-700 mb-1">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            id="applicant-email"
            name="email"
            type="email"
            required
            placeholder="e.g. rahul.sharma@example.com"
            className="w-full px-3.5 py-2.5 bg-[#F8FAFC] border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#004771] focus:bg-white transition-all"
          />
        </div>

        {/* Phone Number */}
        <div>
          <label htmlFor="applicant-phone" className="block text-xs font-semibold text-gray-700 mb-1">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <CountryPhoneInput
            id="applicant-phone"
            name="phone"
            required
            placeholder="98765 43210"
          />
        </div>

        {/* Cover Letter */}
        <div>
          <label htmlFor="applicant-letter" className="block text-xs font-semibold text-gray-700 mb-1">
            Cover Letter / Note <span className="text-red-500">*</span>
          </label>
          <textarea
            id="applicant-letter"
            name="coverLetter"
            rows={3}
            required
            placeholder="Tell us about your background, relevant projects, and why you want to join Travash..."
            className="w-full px-3.5 py-2.5 bg-[#F8FAFC] border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#004771] focus:bg-white transition-all resize-none"
          />
        </div>

        {/* CV/Resume File Upload */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">
            Upload CV / Resume <span className="text-red-500">*</span>
          </label>
          <label
            htmlFor="applicant-resume"
            className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl p-4 bg-[#F8FAFC] hover:bg-gray-50 cursor-pointer transition-colors"
          >
            <Upload className="w-5 h-5 text-gray-400 mb-1" />
            <span className="text-xs font-semibold text-gray-700 text-center">
              {fileName ? fileName : 'Click to select file (PDF, DOC, DOCX - max 10MB)'}
            </span>
            <input
              id="applicant-resume"
              name="resume"
              type="file"
              accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              required
              className="hidden"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setFileName(e.target.files[0].name)
                }
              }}
            />
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full mt-2 py-3 px-6 rounded-xl bg-[#004771] hover:bg-[#02487D] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
        >
          {isSubmitting ? (
            <span>Submitting Application...</span>
          ) : (
            <>
              <span>Submit Application</span>
              <Send className="w-4 h-4" />
            </>
          )}
        </button>

        <p className="text-[11px] text-gray-400 text-center pt-1">
          Your information and resume are kept strictly confidential and used solely for recruitment purposes.
        </p>
      </form>
    </div>
  )
}
