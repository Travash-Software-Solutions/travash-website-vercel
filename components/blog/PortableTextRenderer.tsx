'use client'

import React, { useState } from 'react'
import { PortableText, PortableTextComponents } from '@portabletext/react'
import Image from 'next/image'
import { getSanityImageUrl } from '@/lib/sanity.image'
import { Copy, Check, Info, AlertTriangle, CheckCircle } from 'lucide-react'

function CodeBlock({ value }: { value: { language?: string; code?: string; filename?: string } }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    if (!value?.code) return
    navigator.clipboard.writeText(value.code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="my-6 rounded-xl overflow-hidden border border-slate-700/60 bg-[#0d1117] shadow-xl text-sm">
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-800/80 border-b border-slate-700/60 text-xs text-slate-300">
        <span className="font-mono font-semibold text-sky-400">
          {value?.filename || value?.language || 'Code'}
        </span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-700/70 hover:bg-slate-700 text-slate-200 transition-colors"
          title="Copy code"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto font-mono text-xs md:text-sm text-slate-100 leading-relaxed">
        <code>{value?.code}</code>
      </pre>
    </div>
  )
}

function CalloutBox({ value }: { value: { type?: 'info' | 'success' | 'warning'; title?: string; text?: string } }) {
  const type = value?.type || 'info'

  const styles = {
    info: {
      bg: 'bg-blue-50/70 border-blue-200 text-blue-900 dark:bg-blue-950/30 dark:border-blue-900/60 dark:text-blue-200',
      icon: <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />,
    },
    success: {
      bg: 'bg-emerald-50/70 border-emerald-200 text-emerald-900 dark:bg-emerald-950/30 dark:border-emerald-900/60 dark:text-emerald-200',
      icon: <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />,
    },
    warning: {
      bg: 'bg-amber-50/70 border-amber-200 text-amber-900 dark:bg-amber-950/30 dark:border-amber-900/60 dark:text-amber-200',
      icon: <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />,
    },
  }[type]

  return (
    <div className={`my-6 p-4 rounded-xl border flex items-start gap-3 shadow-sm ${styles.bg}`}>
      {styles.icon}
      <div>
        {value?.title && <h4 className="font-semibold text-sm mb-1">{value.title}</h4>}
        <p className="text-sm leading-relaxed opacity-95">{value?.text}</p>
      </div>
    </div>
  )
}

function VideoEmbed({ value }: { value: { url?: string; caption?: string } }) {
  if (!value?.url) return null

  // Extract YouTube ID if applicable
  let embedUrl = value.url
  const ytMatch = value.url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/)
  if (ytMatch && ytMatch[1]) {
    embedUrl = `https://www.youtube-nocookie.com/embed/${ytMatch[1]}`
  }

  return (
    <figure className="my-8">
      <div className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-xl border border-slate-200 dark:border-slate-800 bg-black">
        <iframe
          src={embedUrl}
          title={value.caption || 'Embedded Video'}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
        />
      </div>
      {value.caption && (
        <figcaption className="text-center text-xs text-slate-500 mt-2 italic">
          {value.caption}
        </figcaption>
      )}
    </figure>
  )
}

function ContentImage({ value }: { value: any }) {
  const imageUrl = getSanityImageUrl(value, 1200)
  const alt = value?.alt || value?.caption || 'Article illustration'

  return (
    <figure className="my-8">
      <div className="relative rounded-2xl overflow-hidden shadow-lg border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
        <Image
          src={imageUrl}
          alt={alt}
          width={1200}
          height={675}
          className="w-full h-auto object-cover max-h-[550px]"
          loading="lazy"
        />
      </div>
      {value?.caption && (
        <figcaption className="text-center text-xs text-slate-500 mt-2.5 italic">
          {value.caption}
        </figcaption>
      )}
    </figure>
  )
}

export const portableTextComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="text-base md:text-lg text-slate-700 leading-relaxed mb-6 font-normal">
        {children}
      </p>
    ),
    h2: ({ children }) => {
      const id = String(children)
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
      return (
        <h2
          id={id}
          className="text-2xl md:text-3xl font-bold text-[#121212] mt-12 mb-5 scroll-mt-28 tracking-tight"
        >
          {children}
        </h2>
      )
    },
    h3: ({ children }) => {
      const id = String(children)
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
      return (
        <h3
          id={id}
          className="text-xl md:text-2xl font-semibold text-[#121212] mt-8 mb-4 scroll-mt-28"
        >
          {children}
        </h3>
      )
    },
    h4: ({ children }) => (
      <h4 className="text-lg md:text-xl font-semibold text-[#121212] mt-6 mb-3">
        {children}
      </h4>
    ),
    h5: ({ children }) => (
      <h5 className="text-base md:text-lg font-semibold text-[#121212] mt-5 mb-2">
        {children}
      </h5>
    ),
    h6: ({ children }) => (
      <h6 className="text-sm md:text-base font-semibold text-slate-800 mt-4 mb-2 uppercase tracking-wider">
        {children}
      </h6>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-8 pl-6 border-l-4 border-blue-600 italic text-lg md:text-xl text-slate-800 bg-blue-50/40 py-4 pr-4 rounded-r-xl">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc pl-6 mb-6 space-y-2.5 text-base md:text-lg text-slate-700">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal pl-6 mb-6 space-y-2.5 text-base md:text-lg text-slate-700">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="leading-relaxed pl-1">{children}</li>,
    number: ({ children }) => <li className="leading-relaxed pl-1">{children}</li>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-bold text-slate-900">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    underline: ({ children }) => <span className="underline underline-offset-4">{children}</span>,
    'strike-through': ({ children }) => <span className="line-through">{children}</span>,
    code: ({ children }) => (
      <code className="px-1.5 py-0.5 rounded bg-slate-100 font-mono text-sm text-blue-600 font-medium">
        {children}
      </code>
    ),
    link: ({ children, value }) => {
      const isExternal = (value?.href || '').startsWith('http')
      return (
        <a
          href={value?.href || '#'}
          target={value?.blank || isExternal ? '_blank' : undefined}
          rel={value?.blank || isExternal ? 'noopener noreferrer' : undefined}
          className="text-blue-600 hover:text-blue-700 underline underline-offset-4 font-medium transition-colors"
        >
          {children}
        </a>
      )
    },
  },
  types: {
    image: ContentImage,
    codeBlock: CodeBlock,
    callout: CalloutBox,
    videoEmbed: VideoEmbed,
  },
}

export default function PortableTextRenderer({ value }: { value: any }) {
  if (!value || (Array.isArray(value) && value.length === 0)) {
    return null
  }

  return (
    <div className="blog-article-content prose prose-slate max-w-none">
      <PortableText value={value} components={portableTextComponents} />
    </div>
  )
}
