'use client'

import React, { useState } from 'react'
import { PortableText, PortableTextComponents } from '@portabletext/react'
import Image from 'next/image'
import { getSanityImageUrl } from '@/lib/sanity.image'
import { Copy, Check, Info, AlertTriangle, CheckCircle, ExternalLink } from 'lucide-react'

function CodeBlock({ value }: { value: { language?: string; code?: string; filename?: string } }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    if (!value?.code) return
    navigator.clipboard.writeText(value.code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="my-6 rounded-xl overflow-hidden border border-slate-200 bg-[#0B1E3D] shadow-lg text-sm">
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#08152B] border-b border-slate-800 text-xs text-slate-300">
        <span className="font-mono font-semibold text-[#00E5FF]">
          {value?.filename || value?.language || 'Architecture / Code'}
        </span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
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
      bg: 'bg-blue-50/80 border-[#02487D]/20 text-[#0B1E3D]',
      icon: <Info className="w-5 h-5 text-[#02487D] flex-shrink-0 mt-0.5" />,
    },
    success: {
      bg: 'bg-emerald-50/80 border-emerald-200 text-emerald-950',
      icon: <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />,
    },
    warning: {
      bg: 'bg-amber-50/80 border-amber-200 text-amber-950',
      icon: <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />,
    },
  }[type]

  return (
    <div className={`my-6 p-4 rounded-xl border flex items-start gap-3 shadow-sm ${styles.bg}`}>
      {styles.icon}
      <div>
        {value?.title && <h4 className="font-semibold text-sm mb-1">{value.title}</h4>}
        <p className="text-sm leading-relaxed text-[#334155]">{value?.text}</p>
      </div>
    </div>
  )
}

function VideoEmbed({ value }: { value: { url?: string; caption?: string } }) {
  if (!value?.url) return null

  let embedUrl = value.url
  const ytMatch = value.url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/)
  if (ytMatch && ytMatch[1]) {
    embedUrl = `https://www.youtube-nocookie.com/embed/${ytMatch[1]}`
  }

  return (
    <figure className="my-8">
      <div className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-xl border border-slate-200 bg-black">
        <iframe
          src={embedUrl}
          title={value.caption || 'Project Video'}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
        />
      </div>
      {value.caption && (
        <figcaption className="mt-2 text-center text-xs text-[#64748B] italic">
          {value.caption}
        </figcaption>
      )}
    </figure>
  )
}

function SanityImageComponent({ value }: { value: any }) {
  const imageUrl = getSanityImageUrl(value, 1200)
  if (!imageUrl) return null

  return (
    <figure className="my-8 group">
      <div className="relative w-full rounded-2xl overflow-hidden border border-slate-200/80 shadow-md bg-slate-50 transition-all hover:shadow-xl">
        <Image
          src={imageUrl}
          alt={value.alt || 'Portfolio Case Study Screenshot'}
          width={1200}
          height={675}
          className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-[1.01]"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1000px"
        />
      </div>
      {(value.caption || value.alt) && (
        <figcaption className="mt-2.5 text-center text-xs text-[#64748B]">
          {value.caption || value.alt}
        </figcaption>
      )}
    </figure>
  )
}

function TableComponent({ value }: { value: { rows?: { cells: string[] }[] } }) {
  if (!value?.rows || !Array.isArray(value.rows) || value.rows.length === 0) return null

  const [headerRow, ...bodyRows] = value.rows

  return (
    <div className="my-8 overflow-x-auto rounded-xl border border-slate-200 shadow-sm">
      <table className="w-full text-left border-collapse text-sm">
        {headerRow && (
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              {headerRow.cells.map((cell, idx) => (
                <th key={idx} className="px-4 py-3 font-semibold text-[#0B1E3D]">
                  {cell}
                </th>
              ))}
            </tr>
          </thead>
        )}
        <tbody className="divide-y divide-slate-100">
          {bodyRows.map((row, rIdx) => (
            <tr key={rIdx} className="hover:bg-slate-50/50 transition-colors">
              {row.cells.map((cell, cIdx) => (
                <td key={cIdx} className="px-4 py-3 text-[#334155]">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export const portfolioPortableTextComponents: PortableTextComponents = {
  types: {
    image: SanityImageComponent,
    code: CodeBlock,
    callout: CalloutBox,
    videoEmbed: VideoEmbed,
    table: TableComponent,
  },
  block: {
    normal: ({ children }) => (
      <p className="mb-5 text-base md:text-lg leading-relaxed text-[#334155] font-normal">
        {children}
      </p>
    ),
    h2: ({ children }) => (
      <h2 className="mt-10 mb-4 text-2xl md:text-3xl font-bold text-[#121212] tracking-tight border-b border-slate-100 pb-3">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-8 mb-3 text-xl md:text-2xl font-bold text-[#121212] tracking-tight">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="mt-6 mb-2 text-lg md:text-xl font-semibold text-[#121212]">
        {children}
      </h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-6 pl-5 border-l-4 border-[#02487D] italic text-slate-700 bg-slate-50/80 py-3 pr-4 rounded-r-xl font-medium">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="my-5 pl-6 space-y-2 list-disc marker:text-[#02487D] text-[#334155]">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="my-5 pl-6 space-y-2 list-decimal marker:text-[#02487D] marker:font-semibold text-[#334155]">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="leading-relaxed pl-1">{children}</li>,
    number: ({ children }) => <li className="leading-relaxed pl-1">{children}</li>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold text-[#0B1E3D]">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    code: ({ children }) => (
      <code className="px-1.5 py-0.5 rounded bg-slate-100 text-[#02487D] font-mono text-sm font-medium">
        {children}
      </code>
    ),
    link: ({ value, children }) => {
      const target = (value?.href || '').startsWith('http') ? '_blank' : undefined
      const rel = target === '_blank' ? 'noopener noreferrer' : undefined
      return (
        <a
          href={value?.href}
          target={target}
          rel={rel}
          className="text-[#02487D] hover:text-[#00E5FF] underline underline-offset-4 decoration-[#02487D]/40 hover:decoration-[#00E5FF] transition-colors inline-flex items-center gap-0.5 font-medium"
        >
          {children}
          {target === '_blank' && <ExternalLink className="w-3 h-3 inline-block ml-0.5 opacity-70" />}
        </a>
      )
    },
  },
}

interface PortfolioPortableTextProps {
  content: any
  className?: string
}

export default function PortfolioPortableText({ content, className = '' }: PortfolioPortableTextProps) {
  if (!content) return null

  // If passed an array of blocks
  if (Array.isArray(content) && content.length > 0) {
    return (
      <div className={`prose max-w-none prose-slate ${className}`}>
        <PortableText value={content} components={portfolioPortableTextComponents} />
      </div>
    )
  }

  // If passed a plain string, render paragraphs
  if (typeof content === 'string') {
    const paragraphs = content.split('\n\n').filter((p) => p.trim())
    return (
      <div className={`space-y-4 ${className}`}>
        {paragraphs.map((p, idx) => (
          <p key={idx} className="text-base md:text-lg leading-relaxed text-[#334155]">
            {p}
          </p>
        ))}
      </div>
    )
  }

  return null
}
