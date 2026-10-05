'use client'

import { useState } from 'react'
import { Building2, MapPin, Copy, Check, ExternalLink } from 'lucide-react'
import { toast } from 'sonner'

export interface OfficeLocation {
  label: string
  address: string
  badge?: string
}

interface OfficeLocationsProps {
  offices?: OfficeLocation[]
}

const DEFAULT_OFFICES: OfficeLocation[] = [
  {
    label: 'India Technology & Delivery Center',
    address: 'Sanali Spazio building, Inorbit Mall Road, Madhapur, Hyderabad, Telangana 500081',
    badge: 'Global HQ & Engineering Hub',
  },
  {
    label: 'Dubai / UAE Regional Office',
    address: 'SAIF ZONE ADDRESS : Saif Office Q1-05-103/A Sharjah, United Arab Emirates',
    badge: 'Middle East Regional Office',
  },
]

export default function OfficeLocations({ offices }: OfficeLocationsProps) {
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null)
  const items = offices && offices.length > 0 ? offices : DEFAULT_OFFICES

  function copyAddress(address: string, idx: number) {
    navigator.clipboard.writeText(address)
    setCopiedIdx(idx)
    toast.success('Address copied to clipboard')
    setTimeout(() => setCopiedIdx(null), 2000)
  }

  return (
    <div className="space-y-4 font-['Plus_Jakarta_Sans',sans-serif]">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">
          Our Global Delivery Hubs
        </h3>
        <span className="text-[11px] font-semibold text-[#14B8A6] flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-[#14B8A6] animate-pulse" />
          Operating Worldwide
        </span>
      </div>

      <div className="space-y-3">
        {items.map((office, idx) => {
          const badge = office.badge || (idx === 0 ? 'Global HQ & Engineering Hub' : 'Middle East Regional Office')
          return (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-white border border-gray-200/90 hover:border-[#004771]/50 shadow-xs hover:shadow-md transition-all group relative overflow-hidden"
            >
              {/* Subtle top accent bar */}
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#004771] to-[#14B8A6] opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#E0F2FE] to-[#eff6ff] text-[#004771] flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-105 transition-transform shadow-2xs">
                  <Building2 className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center justify-between gap-1.5 mb-1.5">
                    <span className="inline-block px-2 py-0.5 rounded-md bg-[#E0F2FE] text-[#004771] text-[10px] font-extrabold uppercase tracking-wider">
                      {badge}
                    </span>
                    <button
                      onClick={() => copyAddress(office.address, idx)}
                      className="p-1 rounded text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
                      title="Copy Address"
                      aria-label="Copy Address"
                    >
                      {copiedIdx === idx ? (
                        <Check className="w-3.5 h-3.5 text-teal-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                  <h4 className="text-sm font-bold text-[#121212] mb-1">
                    {office.label}
                  </h4>
                  <p className="text-xs text-gray-600 leading-relaxed flex items-start gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#14B8A6] flex-shrink-0 mt-0.5" />
                    <span>{office.address}</span>
                  </p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

