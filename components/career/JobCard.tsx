import Link from 'next/link'
import { ArrowRight, MapPin, Briefcase, Clock } from 'lucide-react'

export interface JobItem {
  _id?: string
  title: string
  slug: string
  category: string
  employmentType?: string
  location?: string
  experience?: string
  salary?: string
  shortDescription?: string
}

export default function JobCard({ job }: { job: JobItem }) {
  return (
    <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200/80 shadow-xs hover:shadow-md hover:border-[#004771]/30 transition-all flex flex-col justify-between group">
      <div>
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <span className="px-3 py-1 rounded-full bg-[#E0F2FE] text-[#004771] text-xs font-bold uppercase tracking-wider">
            {job.category}
          </span>
          <span className="text-xs font-semibold text-gray-500 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            <span>{job.employmentType || 'Full-time'}</span>
          </span>
        </div>

        <h3 className="text-xl font-bold text-[#121212] group-hover:text-[#004771] transition-colors mb-3">
          <Link href={`/career/${job.slug}`}>
            {job.title}
          </Link>
        </h3>

        <p className="text-sm text-gray-600 leading-relaxed mb-6 line-clamp-2">
          {job.shortDescription ||
            'Join our engineering squad building enterprise-grade, high-concurrency systems for global clients.'}
        </p>

        <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-gray-500 pt-4 border-t border-gray-100">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#14B8A6]" />
            <span>{job.location || 'Hyderabad, India (Hybrid)'}</span>
          </div>
          {job.experience && (
            <div className="flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5 text-[#004771]" />
              <span>{job.experience}</span>
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 pt-4">
        <Link
          href={`/career/${job.slug}`}
          className="inline-flex items-center gap-2 text-sm font-bold text-[#004771] group-hover:text-[#02487D] transition-colors"
        >
          <span>View Role & Apply</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  )
}
