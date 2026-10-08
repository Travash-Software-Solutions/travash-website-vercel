import Image from 'next/image'
import { Award, Briefcase, Building2 } from 'lucide-react'

const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
    <circle cx="4" cy="4" r="2" />
  </svg>
)

interface Leader {
  name: string
  role: string
  experienceYears?: string
  bio: string
  image?: { asset?: { url: string } }
  linkedinUrl?: string
  highlights?: string[]
}

interface LeadershipSectionProps {
  header?: {
    eyebrow?: string
    heading?: string
    subheading?: string
  }
  leadership?: Leader[]
}

const DEFAULT_LEADER: Leader = {
  name: 'Gaurav Gupta',
  role: 'Founder & Managing Director',
  experienceYears: '24+ Years of Industry Experience',
  bio: 'With over 24 years of experience in the IT industry, Gaurav has gained extensive expertise as a PLM consultant while working with global engineering leaders including Satyam, Geometric Software, GE, and John Deere. In addition to his corporate tenure, he founded Travash Software Solutions to provide premier IT engineering and consulting, and Indi spare Seller Services, a pioneering marketplace for industrial components. His specialization lies in delivering enterprise-grade web, cloud, and mobile platforms at optimal total-cost-of-ownership.',
  linkedinUrl: 'https://www.linkedin.com/in/gauravgupta5/',
  highlights: ['Satyam • GE • John Deere', 'PLM & Enterprise Architecture'],
}

export default function LeadershipSection({ header, leadership }: LeadershipSectionProps) {
  const leaders = leadership && leadership.length > 0 ? leadership : [DEFAULT_LEADER]
  const eyebrow = header?.eyebrow || 'EXECUTIVE LEADERSHIP'
  const heading = header?.heading || 'Guiding Vision & Engineering Rigor'
  const subheading =
    header?.subheading ||
    'Hands-on technology stewardship backed by decades of enterprise software consulting and industrial innovation.'

  return (
    <section className="py-10 sm:py-12 lg:py-16 bg-white font-['Plus_Jakarta_Sans',sans-serif] border-b border-gray-100">
      <div className="max-w-[80rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center  mx-auto mb-8 sm:mb-10">
          <span className="text-[20px] font-bold text-[#14B8A6] uppercase tracking-widest block mb-2">
            {eyebrow}
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#121212] tracking-tight">
            {heading}
          </h2>
          <p className="text-sm sm:text-base text-gray-600 mt-2 sm:mt-3 leading-relaxed">
            {subheading}
          </p>
        </div>

        <div className="mx-auto">
          {leaders.map((leader, idx) => {
            const photoUrl = leader.image?.asset?.url || '/gavrav-gupta.webp'
            const hl = Array.isArray(leader.highlights) && leader.highlights.length > 0
              ? leader.highlights
              : ['Satyam • GE • John Deere', 'PLM & Enterprise Architecture']

            return (
              <div
                key={idx}
                className="bg-[#EEF4FB] rounded-2xl sm:rounded-3xl p-5 sm:p-8 lg:p-10 border border-blue-100 shadow-xs grid md:grid-cols-12 gap-6 sm:gap-8 items-center"
              >
                {/* Profile Photo / Avatar */}
                <div className="md:col-span-6 flex flex-col items-center text-center">
                  <div className="relative w-106 h-106 rounded-2xl overflow-hidden shadow-md border-4 border-white bg-white mb-3 sm:mb-4">
                    <Image
                      src={photoUrl}
                      alt={leader.name}
                      fill
                      className="object-cover object-top"
                      sizes="(max-width: 640px) 150px, 200px"
                    />
                  </div>
                  <h3 className="text-lg sm:text-xl font-extrabold text-[#121212]">{leader.name}</h3>
                  <p className="text-xs sm:text-sm font-semibold text-[#004771] mt-0.5">{leader.role}</p>
                  {leader.linkedinUrl && (
                    <a
                      href={leader.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-600 hover:text-[#004771] mt-2.5 transition-colors"
                    >
                      <span className="text-[#0A66C2]"><LinkedinIcon /></span>
                      <span>Connect on LinkedIn</span>
                    </a>
                  )}
                </div>

                {/* Bio & Track Record */}
                <div className="md:col-span-6 flex flex-col justify-center">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-[#004771] text-xs font-bold w-fit mb-3 sm:mb-4 border border-blue-200/60">
                    <Award className="w-3.5 h-3.5 text-[#14B8A6]" />
                    <span>{leader.experienceYears || '24+ Years IT Leadership'}</span>
                  </div>

                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-4 sm:mb-6">
                    {leader.bio}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 pt-4 border-t border-blue-200/50">
                    {hl.map((item, hIdx) => (
                      <div key={hIdx} className="flex items-center gap-2 text-xs font-semibold text-gray-700">
                        {hIdx === 0 ? (
                          <Briefcase className="w-4 h-4 text-[#004771] shrink-0" />
                        ) : (
                          <Building2 className="w-4 h-4 text-[#14B8A6] shrink-0" />
                        )}
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
