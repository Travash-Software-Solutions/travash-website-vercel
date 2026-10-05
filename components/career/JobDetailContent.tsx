import Link from 'next/link'
import { ArrowLeft, MapPin, Briefcase, Clock, DollarSign, CheckCircle2, ChevronRight } from 'lucide-react'

export interface JobDetailData {
  title: string
  slug: string
  category: string
  employmentType?: string
  location?: string
  experience?: string
  salary?: string
  shortDescription?: string
  overview?: string
  responsibilities?: string[]
  requirements?: string[]
  preferredSkills?: string[]
  benefits?: string[]
}

export default function JobDetailContent({ job }: { job: JobDetailData }) {
  return (
    <div className="font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Breadcrumb & Header */}
      <div className="mb-8">
        <Link
          href="/career"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#004771] hover:underline mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Open Positions</span>
        </Link>

        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span className="px-3 py-1 rounded-full bg-[#E0F2FE] text-[#004771] text-xs font-bold uppercase tracking-wider">
            {job.category}
          </span>
          <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold">
            Actively Hiring
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#121212] tracking-tight mb-4">
          {job.title}
        </h1>

        <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm text-gray-600 pt-2 pb-6 border-b border-gray-200">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-[#14B8A6]" />
            <span>{job.location || 'Hyderabad, India (Hybrid)'}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-[#004771]" />
            <span>{job.employmentType || 'Full-time'}</span>
          </div>
          {job.experience && (
            <div className="flex items-center gap-1.5">
              <Briefcase className="w-4 h-4 text-[#02487D]" />
              <span>{job.experience}</span>
            </div>
          )}
          {job.salary && (
            <div className="flex items-center gap-1.5">
              <DollarSign className="w-4 h-4 text-emerald-600" />
              <span>{job.salary}</span>
            </div>
          )}
        </div>
      </div>

      {/* Role Overview */}
      <div className="space-y-8 text-gray-700 text-base leading-relaxed">
        {job.overview && (
          <div>
            <h2 className="text-xl font-bold text-[#121212] mb-3">Role Overview</h2>
            <p className="leading-relaxed whitespace-pre-line">{job.overview}</p>
          </div>
        )}

        {/* Responsibilities */}
        {job.responsibilities && job.responsibilities.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-[#121212] mb-3">Key Responsibilities</h2>
            <ul className="space-y-2.5">
              {job.responsibilities.map((resp, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#14B8A6] flex-shrink-0 mt-0.5" />
                  <span>{resp}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Requirements */}
        {job.requirements && job.requirements.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-[#121212] mb-3">Qualifications & Requirements</h2>
            <ul className="space-y-2.5">
              {job.requirements.map((req, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#004771] flex-shrink-0 mt-0.5" />
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Preferred Skills */}
        {job.preferredSkills && job.preferredSkills.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-[#121212] mb-3">Preferred Skills & Experience</h2>
            <ul className="space-y-2.5">
              {job.preferredSkills.map((skill, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <ChevronRight className="w-5 h-5 text-[#14B8A6] flex-shrink-0 mt-0.5" />
                  <span>{skill}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Benefits */}
        {job.benefits && job.benefits.length > 0 && (
          <div className="p-6 rounded-2xl bg-[#EEF4FB] border border-blue-100">
            <h2 className="text-lg font-bold text-[#121212] mb-3">What We Offer</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {job.benefits.map((b, idx) => (
                <div key={idx} className="flex items-center gap-2 text-sm text-gray-700 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#14B8A6]" />
                  <span>{b}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
