'use client'

import { useState, useEffect } from 'react'
import type { PortfolioProject, IndustryItem } from '@/lib/portfolio-data'
import PortfolioListingClient from './PortfolioListingClient'

interface GembaToggleWrapperProps {
  allProjects: PortfolioProject[]
  industries: IndustryItem[]
}

const STORAGE_KEY = 'gemba_visible'

export default function GembaToggleWrapper({ allProjects, industries }: GembaToggleWrapperProps) {
  // Default: Gemba is hidden (off) — turn on to show it on the Works page
  const [gembaVisible, setGembaVisible] = useState<boolean>(false)
  const [mounted, setMounted] = useState(false)
  const [showPanel, setShowPanel] = useState(false)

  // Load persisted toggle state from localStorage on mount
  useEffect(() => {
    setMounted(true)
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored !== null) {
        setGembaVisible(stored === 'true')
      }
    } catch {
      // ignore
    }
  }, [])

  const handleToggle = () => {
    const next = !gembaVisible
    setGembaVisible(next)
    try {
      localStorage.setItem(STORAGE_KEY, String(next))
    } catch {
      // ignore
    }
  }

  // Filter projects based on toggle state
  const visibleProjects = allProjects.filter((p) => {
    if (p.slug === 'gemba') return gembaVisible
    return true
  })

  if (!mounted) {
    // SSR/hydration: show all projects except gemba (default hidden)
    const ssrProjects = allProjects.filter((p) => p.slug !== 'gemba')
    return (
      <PortfolioListingClient
        initialProjects={ssrProjects}
        industries={industries}
      />
    )
  }

  return (
    <>
      <PortfolioListingClient
        initialProjects={visibleProjects}
        industries={industries}
      />

      {/* Admin Toggle Panel — floating bottom-right */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
        {/* Expanded panel */}
        {showPanel && (
          <div className="bg-white border border-gray-200 rounded-2xl shadow-2xl p-4 w-72 mb-1 animate-fade-in">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
              Portfolio Admin
            </p>
            <div className="flex items-center justify-between gap-3">
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-800 leading-tight">
                  Gemba Case Study
                </p>
                <p className="text-xs text-gray-500 mt-0.5">
                  {gembaVisible ? 'Visible on Works page' : 'Hidden from Works page'}
                </p>
              </div>
              {/* Toggle switch */}
              <button
                onClick={handleToggle}
                aria-label={gembaVisible ? 'Hide Gemba case study' : 'Show Gemba case study'}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#02487D] focus:ring-offset-2 ${
                  gembaVisible ? 'bg-[#02487D]' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    gembaVisible ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
            <div className="mt-3 pt-3 border-t border-gray-100">
              <p className="text-[11px] text-gray-400 leading-snug">
                Toggle is saved locally. Only visible to you — not shown to site visitors.
              </p>
            </div>
          </div>
        )}

        {/* Pill button to open/close panel */}
        <button
          onClick={() => setShowPanel((prev) => !prev)}
          title="Portfolio Admin Controls"
          className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold shadow-lg transition-all duration-200 select-none ${
            gembaVisible
              ? 'bg-[#02487D] text-white hover:bg-[#023a63]'
              : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 hover:border-gray-300'
          }`}
        >
          {/* Icon */}
          <span className="text-base">{gembaVisible ? '👁️' : '⚙️'}</span>
          <span>
            {showPanel
              ? 'Close Admin'
              : gembaVisible
              ? 'Gemba: ON'
              : 'Gemba: OFF'}
          </span>
          {/* Status dot */}
          <span
            className={`inline-block w-2 h-2 rounded-full ${
              gembaVisible ? 'bg-green-400' : 'bg-gray-300'
            }`}
          />
        </button>
      </div>
    </>
  )
}
