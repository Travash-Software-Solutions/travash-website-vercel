'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import type { ServiceTechnologyGroup } from '@/lib/service-data'

interface ServiceTechnologiesProps {
  technologyStack: ServiceTechnologyGroup[]
}

// Comprehensive icon map — local SVGs + devicon / simple-icons CDN for exhaustive tech coverage
const GLOBAL_ICON_MAP: Record<string, string> = {
  // Cloud Platforms & Infra
  AWS: '/images/services/aws.svg',
  'Amazon Web Services': '/images/services/aws.svg',
  'AWS S3': '/images/services/aws.svg',
  'EC2 Auto-scaling': '/images/services/aws.svg',
  'AWS EMR': '/images/services/aws.svg',
  'AWS Lambda': '/images/services/aws.svg',
  'AWS IoT': '/images/services/aws.svg',
  Azure: '/images/services/azure.svg',
  'Microsoft Azure': '/images/services/azure.svg',
  'Azure Synapse': '/images/services/azure.svg',
  'Azure Synapse Analytics': '/images/services/azure.svg',
  AKS: '/images/services/azure.svg',
  'Azure DevOps': '/images/services/azure.svg',
  'Google Cloud': '/images/services/google-cloud.svg',
  GCP: '/images/services/google-cloud.svg',
  'Google BigQuery': '/images/services/google-cloud.svg',
  'Google Kubernetes Engine': '/images/services/google-cloud.svg',
  GKE: '/images/services/google-cloud.svg',

  // Containerization & Orchestration
  Docker: '/images/services/docker.svg',
  Kubernetes: '/images/services/kubernetes.svg',
  Helm: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/helm/helm-original.svg',
  Terraform: '/images/services/terraform.svg',
  'HashiCorp Terraform': '/images/services/terraform.svg',
  Ansible: '/images/services/ansible.svg',

  // CI/CD & DevOps
  Jenkins: '/images/services/jenkins.svg',
  GitLab: '/images/services/gitlab.svg',
  'GitLab CI': '/images/services/gitlab.svg',
  'GitHub Actions': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/githubactions/githubactions-original.svg',
  ArgoCD: 'https://cdn.simpleicons.org/argo/EF7B4D',

  // Observability & Security
  DataGrip: '/images/services/datagrip.svg',
  Prometheus: '/images/services/prometheus.svg',
  Grafana: '/images/services/grafana.svg',
  Cloudflare: '/images/services/cloudflare.svg',
  Datadog: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/datadog/datadog-original.svg',
  SonarQube: 'https://cdn.simpleicons.org/sonarqube/4E9BCD',

  // Languages
  Python: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg',
  Java: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg',
  'Java Spring Boot': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original.svg',
  'Spring Boot': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original.svg',
  Go: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/go/go-original-wordmark.svg',
  TypeScript: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg',
  JavaScript: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg',
  'C# .NET': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/csharp/csharp-original.svg',
  'C#': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/csharp/csharp-original.svg',
  '.NET': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/dotnetcore/dotnetcore-original.svg',
  PHP: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg',
  Ruby: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/ruby/ruby-original.svg',
  Kotlin: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kotlin/kotlin-original.svg',
  Swift: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/swift/swift-original.svg',

  // Frontend & Mobile
  React: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg',
  'React Native': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg',
  'Next.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg',
  NextJS: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg',
  Angular: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/angularjs/angularjs-original.svg',
  'Vue.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vuejs/vuejs-original.svg',
  Flutter: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flutter/flutter-original.svg',
  'Tailwind CSS': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg',
  Figma: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg',
  'Framer Motion': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/framermotion/framermotion-original.svg',
  Redux: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redux/redux-original.svg',
  iOS: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/apple/apple-original.svg',
  Android: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/android/android-original.svg',
  HTML5: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg',
  CSS3: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg',

  // Backend & APIs
  'Node.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg',
  NodeJS: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg',
  FastAPI: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg',
  GraphQL: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/graphql/graphql-plain.svg',
  REST: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg',

  // Databases & Storage
  PostgreSQL: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg',
  MySQL: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg',
  MongoDB: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg',
  Redis: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg',
  Oracle: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/oracle/oracle-original.svg',
  SQLite: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sqlite/sqlite-original.svg',
  DynamoDB: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg',
  Cassandra: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/apache/apache-original.svg',

  // Data & BI & Pipelines
  'Apache Kafka': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/apachekafka/apachekafka-original.svg',
  Kafka: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/apachekafka/apachekafka-original.svg',
  'Apache Spark': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/apachespark/apachespark-original.svg',
  Spark: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/apachespark/apachespark-original.svg',
  Hadoop: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/hadoop/hadoop-original.svg',
  Airflow: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/apacheairflow/apacheairflow-original.svg',
  dbt: 'https://cdn.simpleicons.org/dbt/FF694B',
  Snowflake: 'https://cdn.simpleicons.org/snowflake/29B5E8',
  BigQuery: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/googlecloud/googlecloud-original.svg',
  'Power BI': 'https://cdn.simpleicons.org/powerbi/F2C811',
  PowerBI: 'https://cdn.simpleicons.org/powerbi/F2C811',
  Tableau: 'https://cdn.simpleicons.org/tableau/E97627',
  Looker: 'https://cdn.simpleicons.org/looker/4285F4',
  'Vertex AI': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/googlecloud/googlecloud-original.svg',
  Dataflow: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/googlecloud/googlecloud-original.svg',
  Redshift: 'https://cdn.simpleicons.org/amazonredshift/8C4FFF',
  Databricks: 'https://cdn.simpleicons.org/databricks/FF3621',

  // AI / ML / CV
  TensorFlow: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tensorflow/tensorflow-original.svg',
  PyTorch: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pytorch/pytorch-original.svg',
  OpenCV: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/opencv/opencv-original.svg',
  'Hugging Face': 'https://cdn.simpleicons.org/huggingface/FFD21E',
  'Scikit-Learn': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/scikitlearn/scikitlearn-original.svg',
  'Scikit Learn': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/scikitlearn/scikitlearn-original.svg',
  YOLOv8: 'https://cdn.simpleicons.org/yolo/00FFFF',
  Milvus: 'https://cdn.simpleicons.org/milvus/00A1EA',
  Pinecone: 'https://cdn.simpleicons.org/pinecone/000000',
  MinIO: 'https://cdn.simpleicons.org/minio/C72E49',
  LangChain: 'https://cdn.simpleicons.org/langchain/1C3C3C',
  'Llama 3': 'https://cdn.simpleicons.org/meta/0082FB',
  OpenAI: '/images/services/openai.svg',
  ONNX: 'https://cdn.simpleicons.org/onnx/717272',
  Keras: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/keras/keras-original.svg',

  // QA & Automated Testing
  Playwright: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/playwright/playwright-original.svg',
  Cypress: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cypressio/cypressio-original.svg',
  Selenium: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/selenium/selenium-original.svg',
  Jest: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jest/jest-plain.svg',
  Postman: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg',
  JMeter: 'https://cdn.simpleicons.org/apachejmeter/D22128',
  k6: 'https://cdn.simpleicons.org/k6/7D64FF',
  Appium: 'https://cdn.simpleicons.org/appium/662D91',
  JUnit: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/junit/junit-original.svg',
  Jira: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jira/jira-original.svg',
  Allure: 'https://cdn.simpleicons.org/qameta/000000',

  // OCR / Document AI
  'Tesseract OCR': 'https://cdn.simpleicons.org/tesseract/000000',
  LayoutLM: 'https://cdn.simpleicons.org/huggingface/FFD21E',
}

const DEFAULT_TECH_GROUPS: ServiceTechnologyGroup[] = [
  {
    category: 'Cloud Platforms',
    technologies: ['AWS', 'Microsoft Azure', 'Google Cloud'],
    items: [
      { name: 'AWS', icon: '/images/services/aws.svg' },
      { name: 'Azure', icon: '/images/services/azure.svg' },
      { name: 'Google Cloud', icon: '/images/services/google-cloud.svg' },
    ],
    description: 'Enterprise multi-cloud ecosystems with auto-scaling compute and high-availability architecture.',
  },
  {
    category: 'Containerization & Orchestration',
    technologies: ['Docker', 'Kubernetes'],
    items: [
      { name: 'Docker', icon: '/images/services/docker.svg' },
      { name: 'Kubernetes', icon: '/images/services/kubernetes.svg' },
    ],
    description: 'Microservices containerization with zero-downtime rolling deployments and automated cluster healing.',
  },
  {
    category: 'CI/CD & Automation',
    technologies: ['Jenkins', 'GitLab', 'Ansible', 'HashiCorp Terraform'],
    items: [
      { name: 'Jenkins', icon: '/images/services/jenkins.svg' },
      { name: 'GitLab', icon: '/images/services/gitlab.svg' },
      { name: 'Ansible', icon: '/images/services/ansible.svg' },
      { name: 'Terraform', icon: '/images/services/terraform.svg' },
    ],
    description: 'Version-controlled infrastructure as code and automated deployment pipelines with zero human error.',
  },
  {
    category: 'Monitoring & Security',
    technologies: ['DataGrip', 'Prometheus', 'Grafana', 'Cloudflare'],
    items: [
      { name: 'DataGrip', icon: '/images/services/datagrip.svg' },
      { name: 'Prometheus', icon: '/images/services/prometheus.svg' },
      { name: 'Grafana', icon: '/images/services/grafana.svg' },
      { name: 'Cloudflare', icon: '/images/services/cloudflare.svg' },
    ],
    description: 'Real-time infrastructure observability, log aggregation, automated alerts, and edge DDoS protection.',
  },
]

export default function ServiceTechnologies({ technologyStack }: ServiceTechnologiesProps) {
  const groups = technologyStack && technologyStack.length > 0 ? technologyStack : DEFAULT_TECH_GROUPS

  return (
    <section
      id="technologies"
      className="py-14 sm:py-18 lg:py-24 bg-white font-['Plus_Jakarta_Sans',sans-serif] border-b border-gray-100 overflow-hidden"
    >
      <div className="max-w-[80rem] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12 sm:mb-16"
        >
          <span className="text-xs font-bold uppercase tracking-widest text-[#066095] block mb-2">
            Technology Ecosystem
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-semibold text-[#121212] tracking-tight leading-tight mb-3">
            The Technologies We Command
          </h2>
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed font-normal">
            We leverage the industry's most powerful infrastructure and automation tools:
          </p>
        </motion.div>

        {/* Categorized Tech Cards Grid */}
        <div
          className={`grid grid-cols-1 md:grid-cols-2 ${groups.length === 1
              ? 'lg:grid-cols-1 max-w-md mx-auto'
              : groups.length === 2
                ? 'lg:grid-cols-2 max-w-4xl mx-auto'
                : groups.length === 3
                  ? 'lg:grid-cols-3 max-w-6xl mx-auto'
                  : 'lg:grid-cols-4'
            } gap-6 sm:gap-8`}
        >
          {groups.map((group, idx) => {
            const techItems = group.items && group.items.length > 0
              ? group.items
              : group.technologies.map(t => ({ name: t, icon: undefined as string | undefined }))

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="bg-[#F8FAFC] border border-gray-200/90 rounded-2xl p-6 sm:p-7 flex flex-col justify-between hover:border-[#02487D]/40 hover:shadow-md transition-all duration-300 group"
              >
                <div>
                  <h3 className="text-lg font-bold text-[#121212] group-hover:text-[#02487D] transition-colors mb-4 pb-3 border-b border-gray-200/80">
                    {group.category}
                  </h3>

                  {/* Tech Icons Grid */}
                  <div className="grid grid-cols-3 gap-3 mb-5">
                    {techItems.map((tech, tIdx) => {
                      const rawIcon = (tech as any).icon as string | undefined
                      const isValid = typeof rawIcon === 'string' && (rawIcon.startsWith('/') || rawIcon.startsWith('http'))
                      const iconSrc = isValid ? rawIcon : (GLOBAL_ICON_MAP[tech.name] || null)

                      return (
                        <div
                          key={tIdx}
                          className="bg-white border border-gray-200/80 rounded-xl p-2.5 flex flex-col items-center justify-center text-center shadow-2xs hover:border-[#02487D]/50 hover:shadow-sm transition-all duration-200"
                        >
                          {iconSrc ? (
                            <div className="w-8 h-8 relative mb-1.5 flex items-center justify-center">
                              <Image
                                src={iconSrc}
                                alt={tech.name}
                                width={32}
                                height={32}
                                className="object-contain max-h-7 w-auto"
                                unoptimized
                              />
                            </div>
                          ) : (
                            // Fallback: coloured initial badge
                            <div className="w-8 h-8 mb-1.5 rounded-lg bg-gradient-to-br from-[#004771] to-[#14B8A6] flex items-center justify-center flex-shrink-0">
                              <span className="text-white text-[11px] font-bold">
                                {tech.name.slice(0, 2).toUpperCase()}
                              </span>
                            </div>
                          )}
                          <span className="text-[10px] font-semibold text-gray-700 leading-tight text-center line-clamp-2">
                            {tech.name}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {group.description && (
                  <p className="text-xs text-gray-500 leading-relaxed font-normal pt-3 border-t border-gray-200/60">
                    {group.description}
                  </p>
                )}
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
