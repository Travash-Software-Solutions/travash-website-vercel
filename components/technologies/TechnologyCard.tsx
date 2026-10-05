'use client'

import Image from 'next/image'
import { ExternalLink } from 'lucide-react'

export interface TechnologyItem {
  _id?: string
  name: string
  slug?: string
  category?: string
  categoryTitle?: string
  icon?: { asset?: { url: string } }
  description?: string
  website?: string
  featured?: boolean
}

interface TechMeta {
  icon: string
  category: string
  description: string
}

export const TECH_DIRECTORY_MAP: Record<string, TechMeta> = {
  // Biometrics & AI
  AFIS: {
    icon: 'https://cdn.simpleicons.org/auth0/004771',
    category: 'AI & Biometrics',
    description: 'Automated Fingerprint Identification System for high-accuracy biometric verification and adverse case detection.',
  },
  AI: {
    icon: 'https://cdn.simpleicons.org/openai/000000',
    category: 'Machine Learning & AI',
    description: 'Custom deep learning models, sovereign LLM agents, and intelligent automation systems deployed for enterprise scale.',
  },
  'Computer Vision': {
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/opencv/opencv-original.svg',
    category: 'Machine Learning & AI',
    description: 'Deep learning vision inference pipelines for real-time object detection, crowd tracking, and biometric recognition.',
  },
  DARPAN: {
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/opencv/opencv-original.svg',
    category: 'AI & Biometrics',
    description: 'AI facial recognition and missing person retrieval engine querying millions of state records in sub-seconds.',
  },
  'Facial Recognition': {
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/opencv/opencv-original.svg',
    category: 'AI & Biometrics',
    description: 'Deep neural networks for facial matching, biometric anti-spoofing, and real-time live video feed inspection.',
  },
  'Machine Learning': {
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pytorch/pytorch-original.svg',
    category: 'Machine Learning & AI',
    description: 'End-to-end predictive pipelines, automated feature engineering, and robust production MLOps telemetry.',
  },
  PyTorch: {
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pytorch/pytorch-original.svg',
    category: 'Machine Learning & AI',
    description: 'Leading deep learning framework for training and deploying custom neural networks.',
  },
  TensorFlow: {
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tensorflow/tensorflow-original.svg',
    category: 'Machine Learning & AI',
    description: 'End-to-end open-source machine learning and computer vision pipeline.',
  },
  'OpenAI / LLMs': {
    icon: 'https://cdn.simpleicons.org/openai/000000',
    category: 'Machine Learning & AI',
    description: 'Integration of sovereign agents, RAG workflows, and enterprise automation.',
  },
  LangChain: {
    icon: 'https://cdn.simpleicons.org/langchain/1C3C3C',
    category: 'Machine Learning & AI',
    description: 'Framework for building context-aware reasoning applications and agents.',
  },

  // Cloud & DevOps
  AWS: {
    icon: '/images/services/aws.svg',
    category: 'Cloud & Infrastructure',
    description: 'Enterprise cloud infrastructure spanning serverless, VPCs, compute clusters, and global CDN delivery.',
  },
  'Amazon Web Services': {
    icon: '/images/services/aws.svg',
    category: 'Cloud & Infrastructure',
    description: 'Enterprise cloud infrastructure spanning serverless, VPCs, and global CDN.',
  },
  Docker: {
    icon: '/images/services/docker.svg',
    category: 'Cloud & Infrastructure',
    description: 'Containerization standard ensuring reproducible execution from local development to production clusters.',
  },
  Kubernetes: {
    icon: '/images/services/kubernetes.svg',
    category: 'Cloud & Infrastructure',
    description: 'Automated container orchestration, dynamic autoscaling, and zero-downtime rolling deployments.',
  },
  'Microsoft Azure': {
    icon: '/images/services/azure.svg',
    category: 'Cloud & Infrastructure',
    description: 'Hybrid cloud architectures deeply integrated with Microsoft enterprise tools.',
  },
  'Google Cloud Platform': {
    icon: '/images/services/google-cloud.svg',
    category: 'Cloud & Infrastructure',
    description: 'Global data infrastructure, BigQuery analytics, and Vertex AI models.',
  },
  Terraform: {
    icon: '/images/services/terraform.svg',
    category: 'DevOps & CI/CD',
    description: 'Infrastructure as Code (IaC) defining reproducible, immutable cloud resources.',
  },
  'GitLab CI / GitHub Actions': {
    icon: '/images/services/gitlab.svg',
    category: 'DevOps & CI/CD',
    description: 'Automated testing, security scanning, and containerized CD pipelines.',
  },
  Ansible: {
    icon: '/images/services/ansible.svg',
    category: 'DevOps & CI/CD',
    description: 'Agentless IT automation and configuration management for servers.',
  },
  'Prometheus & Grafana': {
    icon: '/images/services/grafana.svg',
    category: 'DevOps & CI/CD',
    description: 'Full-stack observability, real-time metrics dashboards, and alerting.',
  },

  // Data & Big Data
  'Data Extraction': {
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/apachespark/apachespark-original.svg',
    category: 'Big Data & Analytics',
    description: 'Automated high-throughput document parsing, OCR pipelines, and web data extraction engines.',
  },
  'Apache Spark': {
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/apachespark/apachespark-original.svg',
    category: 'Big Data & Analytics',
    description: 'Unified analytics engine for large-scale distributed data processing.',
  },
  'Apache Kafka': {
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/apachekafka/apachekafka-original.svg',
    category: 'Big Data & Analytics',
    description: 'Distributed event store and stream-processing platform for high throughput.',
  },
  Snowflake: {
    icon: 'https://cdn.simpleicons.org/snowflake/29B5E8',
    category: 'Big Data & Analytics',
    description: 'Elastic, zero-management cloud data warehousing for BI and enterprise reporting.',
  },
  Hadoop: {
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/apache/apache-original.svg',
    category: 'Big Data & Analytics',
    description: 'Distributed compute and storage framework for high-volume enterprise data lakes.',
  },

  // Backend & Architecture
  Microservices: {
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original.svg',
    category: 'Backend Architecture',
    description: 'Decoupled, event-driven microservices architecture built for high concurrency and resilience.',
  },
  Java: {
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg',
    category: 'Web Application',
    description: 'Robust backend architecture with Spring Boot for high-throughput banking, telco, and public sector systems.',
  },
  Python: {
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg',
    category: 'Web Application',
    description: 'FastAPI and Django platforms built for high security, scalable APIs, and AI pipeline integration.',
  },
  'PHP / Laravel': {
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg',
    category: 'Web Application',
    description: 'Modern expressive framework powering scalable SaaS platforms and APIs.',
  },
  '.NET Core': {
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/dotnetcore/dotnetcore-original.svg',
    category: 'Web Application',
    description: 'Cross-platform, high-performance runtime for Microsoft enterprise ecosystems.',
  },
  'Node.js': {
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg',
    category: 'Web Application',
    description: 'Asynchronous event-driven JavaScript runtime for high-throughput microservices and APIs.',
  },

  // Frontend & Mobile
  'Mobile App': {
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flutter/flutter-original.svg',
    category: 'Mobile Application',
    description: 'High-performance mobile applications engineered for iOS and Android with offline-first synchronization.',
  },
  React: {
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg',
    category: 'Web Application',
    description: 'Declarative component-driven UI library for high-speed enterprise portals.',
  },
  'Next.js': {
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg',
    category: 'Web Application',
    description: 'Full-stack React framework with SSR, ISR, and optimized edge delivery.',
  },
  'Vue.js': {
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vuejs/vuejs-original.svg',
    category: 'Web Application',
    description: 'Progressive, performant frontend architecture for interactive dashboards.',
  },
  Angular: {
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/angularjs/angularjs-original.svg',
    category: 'Web Application',
    description: 'Enterprise-grade TypeScript framework for scalable modular apps.',
  },
  Flutter: {
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flutter/flutter-original.svg',
    category: 'Mobile Application',
    description: 'Multi-platform natively compiled apps with fluid 120fps UI performance.',
  },
  'React Native': {
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg',
    category: 'Mobile Application',
    description: 'Cross-platform native mobile applications with shared business logic.',
  },
  'iOS (Swift)': {
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/swift/swift-original.svg',
    category: 'Mobile Application',
    description: 'Bespoke native Apple ecosystem applications with hardware acceleration.',
  },
  'Android (Kotlin)': {
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kotlin/kotlin-original.svg',
    category: 'Mobile Application',
    description: 'Modern, idiomatic Android applications designed for memory efficiency.',
  },

  // Databases & Storage
  PostgreSQL: {
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg',
    category: 'Databases & Storage',
    description: 'Advanced object-relational database with robust ACID compliance and JSON extensions.',
  },
  MySQL: {
    icon: '/casestudy-img/mysql-1.svg',
    category: 'Databases & Storage',
    description: 'Battle-tested relational database engineered for high concurrency workloads.',
  },
  MongoDB: {
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg',
    category: 'Databases & Storage',
    description: 'Distributed document database for dynamic schemas and fast iteration.',
  },
  Redis: {
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg',
    category: 'Databases & Storage',
    description: 'In-memory data structure store used as a sub-millisecond cache and message broker.',
  },

  // Security
  'Identity & Access (IAM)': {
    icon: 'https://cdn.simpleicons.org/auth0/004771',
    category: 'Enterprise Security',
    description: 'Role-based access control, SSO, and OAuth2/OpenID enterprise federation.',
  },
  Cloudflare: {
    icon: '/images/services/cloudflare.svg',
    category: 'Enterprise Security',
    description: 'DDoS mitigation, web application firewall (WAF), and global edge security.',
  },
  'SIEM & SOC Operations': {
    icon: 'https://cdn.simpleicons.org/sonarqube/4E9BCD',
    category: 'Enterprise Security',
    description: 'Automated security information event management and threat telemetry.',
  },
}

export function resolveTechMeta(name: string): TechMeta | null {
  if (TECH_DIRECTORY_MAP[name]) return TECH_DIRECTORY_MAP[name]
  const lower = name.toLowerCase().trim()
  for (const [k, v] of Object.entries(TECH_DIRECTORY_MAP)) {
    if (k.toLowerCase().trim() === lower) return v
  }
  return null
}

export default function TechnologyCard({ tech }: { tech: TechnologyItem }) {
  const meta = resolveTechMeta(tech.name)
  const iconUrl = tech.icon?.asset?.url || meta?.icon
  const category = (tech.categoryTitle && tech.categoryTitle !== 'Web Application' ? tech.categoryTitle : null) || meta?.category || tech.category || 'Technology'
  const isGenericDesc = !tech.description || tech.description.includes('Enterprise-grade Web Application solution')
  const description = (!isGenericDesc ? tech.description : null) || meta?.description || `High-performance ${category} solution deployed for enterprise scale.`

  return (
    <div className="bg-white rounded-2xl p-5 sm:p-6 border border-gray-100 shadow-xs hover:shadow-md hover:border-[#004771]/30 transition-all flex flex-col justify-between group">
      <div>
        <div className="flex items-center justify-between gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-[#F8FAFC] border border-gray-100 flex items-center justify-center relative overflow-hidden group-hover:bg-[#E0F2FE] transition-colors p-2.5">
            {iconUrl ? (
              <Image
                src={iconUrl}
                alt={tech.name}
                width={36}
                height={36}
                className="object-contain w-auto h-auto max-w-full max-h-full group-hover:scale-110 transition-transform duration-300"
                unoptimized
              />
            ) : (
              <span className="text-sm font-extrabold text-[#004771]">
                {tech.name.slice(0, 2).toUpperCase()}
              </span>
            )}
          </div>

          {tech.website && (
            <a
              href={tech.website}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Official website of ${tech.name}`}
              className="text-gray-400 hover:text-[#004771] transition-colors p-1"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>

        <h3 className="text-base font-bold text-[#121212] group-hover:text-[#004771] transition-colors mb-1.5">
          {tech.name}
        </h3>

        <p className="text-xs sm:text-sm text-gray-500 leading-relaxed line-clamp-2">
          {description}
        </p>
      </div>

      <div className="mt-4 pt-3 border-t border-gray-50 flex items-center justify-between">
        <span className="text-[11px] font-bold text-[#14B8A6] uppercase tracking-wider">
          {category}
        </span>
      </div>
    </div>
  )
}
