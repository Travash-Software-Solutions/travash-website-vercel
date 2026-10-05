'use client'

import { useState, useMemo } from 'react'
import TechnologyCard, { TechnologyItem, resolveTechMeta } from './TechnologyCard'
import { Search, Layers } from 'lucide-react'

interface TechnologyGridProps {
  technologies: TechnologyItem[]
  categories?: string[]
}

const DEFAULT_CATEGORIES_ORDER = [
  'All',
  'Web Application',
  'Mobile Application',
  'Machine Learning & AI',
  'AI & Biometrics',
  'Cloud & Infrastructure',
  'Big Data & Analytics',
  'Databases & Storage',
  'DevOps & CI/CD',
  'Enterprise Security',
]

const DEFAULT_TECHNOLOGIES: TechnologyItem[] = [
  // Web Application
  { name: 'React', category: 'Web Application', description: 'Declarative component-driven UI library for high-speed enterprise portals.' },
  { name: 'Next.js', category: 'Web Application', description: 'Full-stack React framework with SSR, ISR, and optimized edge delivery.' },
  { name: 'Vue.js', category: 'Web Application', description: 'Progressive, performant frontend architecture for interactive dashboards.' },
  { name: 'Angular', category: 'Web Application', description: 'Enterprise-grade TypeScript framework for scalable modular apps.' },
  { name: 'Java', category: 'Web Application', description: 'Robust backend architecture with Spring Boot for high-throughput banking & telco.' },
  { name: 'PHP / Laravel', category: 'Web Application', description: 'Modern expressive framework powering scalable SaaS platforms and APIs.' },
  { name: 'Python', category: 'Web Application', description: 'FastAPI and Django platforms built for high security and AI integration.' },
  { name: '.NET Core', category: 'Web Application', description: 'Cross-platform, high-performance runtime for Microsoft enterprise ecosystems.' },

  // Mobile Application
  { name: 'Flutter', category: 'Mobile Application', description: 'Multi-platform natively compiled apps with fluid 120fps UI performance.' },
  { name: 'React Native', category: 'Mobile Application', description: 'Cross-platform native mobile applications with shared business logic.' },
  { name: 'iOS (Swift)', category: 'Mobile Application', description: 'Bespoke native Apple ecosystem applications with hardware acceleration.' },
  { name: 'Android (Kotlin)', category: 'Mobile Application', description: 'Modern, idiomatic Android applications designed for memory efficiency.' },

  // Big Data & Analytics
  { name: 'Apache Spark', category: 'Big Data & Analytics', description: 'Unified analytics engine for large-scale distributed data processing.' },
  { name: 'Apache Kafka', category: 'Big Data & Analytics', description: 'Distributed event store and stream-processing platform for high throughput.' },
  { name: 'Snowflake', category: 'Big Data & Analytics', description: 'Elastic, zero-management cloud data warehousing for BI and enterprise reporting.' },
  { name: 'Hadoop', category: 'Big Data & Analytics', description: 'Distributed compute and storage framework for high-volume enterprise data lakes.' },

  // Machine Learning & AI
  { name: 'PyTorch', category: 'Machine Learning & AI', description: 'Leading deep learning framework for training and deploying custom neural networks.' },
  { name: 'TensorFlow', category: 'Machine Learning & AI', description: 'End-to-end open-source machine learning and computer vision pipeline.' },
  { name: 'OpenAI / LLMs', category: 'Machine Learning & AI', description: 'Integration of sovereign agents, RAG workflows, and enterprise automation.' },
  { name: 'LangChain', category: 'Machine Learning & AI', description: 'Framework for building context-aware reasoning applications and agents.' },

  // Cloud & Infrastructure
  { name: 'Amazon Web Services', category: 'Cloud & Infrastructure', icon: { asset: { url: '/images/services/aws.svg' } }, description: 'Enterprise cloud infrastructure spanning serverless, VPCs, and global CDN.' },
  { name: 'Microsoft Azure', category: 'Cloud & Infrastructure', icon: { asset: { url: '/images/services/azure.svg' } }, description: 'Hybrid cloud architectures deeply integrated with Microsoft enterprise tools.' },
  { name: 'Google Cloud Platform', category: 'Cloud & Infrastructure', icon: { asset: { url: '/images/services/google-cloud.svg' } }, description: 'Global data infrastructure, BigQuery analytics, and Vertex AI models.' },
  { name: 'Docker', category: 'Cloud & Infrastructure', icon: { asset: { url: '/images/services/docker.svg' } }, description: 'Containerization standard ensuring reproducible execution from dev to production.' },
  { name: 'Kubernetes', category: 'Cloud & Infrastructure', icon: { asset: { url: '/images/services/kubernetes.svg' } }, description: 'Automated container orchestration, autoscaling, and zero-downtime rolling updates.' },

  // Databases & Storage
  { name: 'PostgreSQL', category: 'Databases & Storage', description: 'Advanced object-relational database with robust ACID compliance and JSON extensions.' },
  { name: 'MySQL', category: 'Databases & Storage', icon: { asset: { url: '/casestudy-img/mysql-1.svg' } }, description: 'Battle-tested relational database engineered for high concurrency workloads.' },
  { name: 'MongoDB', category: 'Databases & Storage', description: 'Distributed document database for dynamic schemas and fast iteration.' },
  { name: 'Redis', category: 'Databases & Storage', description: 'In-memory data structure store used as a sub-millisecond cache and message broker.' },

  // DevOps & CI/CD
  { name: 'Terraform', category: 'DevOps & CI/CD', icon: { asset: { url: '/images/services/terraform.svg' } }, description: 'Infrastructure as Code (IaC) defining reproducible, immutable cloud resources.' },
  { name: 'GitLab CI / GitHub Actions', category: 'DevOps & CI/CD', icon: { asset: { url: '/images/services/gitlab.svg' } }, description: 'Automated testing, security scanning, and containerized CD pipelines.' },
  { name: 'Ansible', category: 'DevOps & CI/CD', icon: { asset: { url: '/images/services/ansible.svg' } }, description: 'Agentless IT automation and configuration management for servers.' },
  { name: 'Prometheus & Grafana', category: 'DevOps & CI/CD', icon: { asset: { url: '/images/services/grafana.svg' } }, description: 'Full-stack observability, real-time metrics dashboards, and alerting.' },

  // Enterprise Security
  { name: 'Identity & Access (IAM)', category: 'Enterprise Security', description: 'Role-based access control, SSO, and OAuth2/OpenID enterprise federation.' },
  { name: 'Cloudflare', category: 'Enterprise Security', icon: { asset: { url: '/images/services/cloudflare.svg' } }, description: 'DDoS mitigation, web application firewall (WAF), and global edge security.' },
  { name: 'SIEM & SOC Operations', category: 'Enterprise Security', description: 'Automated security information event management and threat telemetry.' },
]

export default function TechnologyGrid({ technologies, categories: customCategories }: TechnologyGridProps) {
  const allTechs = technologies && technologies.length > 0 ? technologies : DEFAULT_TECHNOLOGIES
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [searchQuery, setSearchQuery] = useState<string>('')

  // Derive categories accurately from resolved metadata
  const categories = useMemo(() => {
    const cats = new Set<string>()
    allTechs.forEach((t) => {
      const meta = resolveTechMeta(t.name)
      const c = (t.categoryTitle && t.categoryTitle !== 'Web Application' ? t.categoryTitle : null) || meta?.category || t.category
      if (c) cats.add(c)
    })

    // Sort according to defined order if present
    const list = Array.from(cats)
    const sorted = DEFAULT_CATEGORIES_ORDER.filter((c) => c === 'All' || list.includes(c))
    list.forEach((c) => {
      if (!sorted.includes(c)) sorted.push(c)
    })
    return sorted
  }, [allTechs])

  // Filtered techs
  const filteredTechs = useMemo(() => {
    return allTechs.filter((tech) => {
      const meta = resolveTechMeta(tech.name)
      const cat = (tech.categoryTitle && tech.categoryTitle !== 'Web Application' ? tech.categoryTitle : null) || meta?.category || tech.category || 'Technology'
      const desc = meta?.description || tech.description || ''
      const matchCat = selectedCategory === 'All' || cat === selectedCategory
      const query = searchQuery.toLowerCase().trim()
      const matchSearch =
        !query ||
        tech.name.toLowerCase().includes(query) ||
        desc.toLowerCase().includes(query) ||
        cat.toLowerCase().includes(query)

      return matchCat && matchSearch
    })
  }, [allTechs, selectedCategory, searchQuery])

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-[#F8FAFC] font-['Plus_Jakarta_Sans',sans-serif]">
      <div className="max-w-[80rem] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Category Navigation & Search */}
        <div className="mb-12 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${selectedCategory === cat
                    ? 'bg-[#004771] text-white shadow-xs'
                    : 'bg-white text-gray-600 hover:text-gray-900 border border-gray-200 hover:border-gray-300'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72 flex-shrink-0">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search technologies..."
              className="w-full pl-10 pr-4 py-2 text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#004771] transition-colors"
            />
          </div>
        </div>

        {/* Tech Grid */}
        {filteredTechs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
            {filteredTechs.map((tech) => (
              <TechnologyCard key={tech._id || tech.name} tech={tech} />
            ))}
          </div>
        ) : (
          <div className="max-w-md mx-auto text-center py-16 bg-white rounded-2xl border border-gray-200 p-8">
            <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center mx-auto text-gray-400 mb-4">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-[#121212] mb-1">No technologies found</h3>
            <p className="text-xs sm:text-sm text-gray-500 mb-6">
              No technology matched &quot;{searchQuery || selectedCategory}&quot;.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All')
                setSearchQuery('')
              }}
              className="px-4 py-2 rounded-lg bg-[#004771] text-white text-xs font-semibold hover:bg-[#02487D] transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
