import { Shield, Sparkles, HeartHandshake, Users, Globe, Award } from 'lucide-react'

interface ValueItem {
  title: string
  description: string
  iconName?: string
}

interface ValuesGridProps {
  header?: {
    eyebrow?: string
    heading?: string
    subheading?: string
  }
  values?: ValueItem[]
  heading?: string
  eyebrow?: string
  subheading?: string
}

const DEFAULT_VALUES: ValueItem[] = [
  {
    title: 'Integrity & Trust',
    description:
      'We uphold the highest ethical standards, ensuring transparency, honesty, and accountability in everything we do.',
    iconName: 'Shield',
  },
  {
    title: 'Value Creation',
    description:
      'We’re obsessed with creating value for our clients and supercharging their progress.',
    iconName: 'Award',
  },
  {
    title: 'People-centricity',
    description:
      'We encourage our people to “find their spark” and shape their career journeys. We empower people to be entrepreneurs and creators and to surface ideas.',
    iconName: 'Users',
  },
  {
    title: 'Inclusion & Equal Opportunity',
    description:
      'We uphold the highest ethical standards, ensuring transparency, honesty, and accountability in everything we do.',
    iconName: 'HeartHandshake',
  },
  {
    title: 'Social Responsibility',
    description:
      'We give back to our communities and we are focused on doing the right things for our planet and the communities where we work and live.',
    iconName: 'Globe',
  },
]

const iconMap: Record<string, any> = {
  Shield,
  Award,
  Users,
  HeartHandshake,
  Globe,
  Sparkles,
}

export default function ValuesGrid({ header, values, heading, eyebrow, subheading }: ValuesGridProps) {
  const items = values && values.length > 0 ? values : DEFAULT_VALUES
  const finalEyebrow = header?.eyebrow || eyebrow || 'WHAT GUIDES US'
  const finalHeading = header?.heading || heading || 'Our Core Values'
  const finalSubheading =
    header?.subheading ||
    subheading ||
    'The enduring principles that define how we build software, collaborate with clients, and nurture talent.'

  return (
    <section className="py-10 sm:py-14 lg:py-16 bg-[#F8FAFC] font-['Plus_Jakarta_Sans',sans-serif] border-b border-gray-100">
      <div className="max-w-[80rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <span className="text-xs font-bold text-[#14B8A6] uppercase tracking-widest block mb-2">
            {finalEyebrow}
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#121212] tracking-tight">
            {finalHeading}
          </h2>
          <p className="text-sm sm:text-base text-gray-600 mt-2 sm:mt-3 leading-relaxed">
            {finalSubheading}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-6xl mx-auto">
          {items.map((item, idx) => {
            const Icon = (item.iconName && iconMap[item.iconName]) || Sparkles
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-5 sm:p-7 border border-gray-100 shadow-2xs hover:shadow-md hover:border-gray-200 transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#E0F2FE] text-[#004771] group-hover:bg-[#004771] group-hover:text-white transition-colors flex items-center justify-center mb-4 sm:mb-5">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-[#121212] mb-2 group-hover:text-[#004771] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
