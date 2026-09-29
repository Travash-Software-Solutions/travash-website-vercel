'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Play } from 'lucide-react'
import VideoModal from '@/components/ui/VideoModal'

interface IntroVideoData {
  eyebrow?: string
  heading?: string
  videoUrl?: string
  videoThumbnail?: { asset?: { url: string } }
}

export default function IntroVideo({ data }: { data?: IntroVideoData }) {
  const [isOpen, setIsOpen] = useState(false)
  const posterUrl = data?.videoThumbnail?.asset?.url || '/home-img/video-thumb.png'
  const heading = data?.heading || 'Meet Your Next Technology Partner'
  const eyebrow = data?.eyebrow || 'Our Intro'
  const videoUrl = data?.videoUrl || 'https://www.youtube.com/embed/ch2ui0gfHUY'

  return (
    <>
      <section className="relative py-14 lg:py-20 bg-white overflow-hidden font-['Plus_Jakarta_Sans',sans-serif]">
        {/* Soft background wave graphic */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <div className="relative w-full h-full">
            <Image
              src="/home-img/Abstract-Photoshop-Background-Amazing-HD-Wallpaper-14105 2.png"
              alt="Travash technology innovation wave background"
              fill
              className="object-cover object-center"
            />
          </div>
        </div>

        <div className="relative max-w-[80rem] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Eyebrow & Heading */}
          <div className="mb-8 lg:mb-10 max-w-3xl mx-auto">
            {/* Plain small eyebrow label */}
            <p className="text-[12px] font-semibold text-gray-500 uppercase tracking-widest mb-3">
              {eyebrow}
            </p>
            <h2
              className="font-[500] tracking-tight leading-tight"
              style={{
                fontSize: 'clamp(24px, 3.5vw, 42px)',
                letterSpacing: '-0.02em',
                background: 'linear-gradient(90deg, #004771 0%, #448AE1 65.38%, #051529 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {heading}
            </h2>
          </div>

          {/* Video Container */}
          <div className="max-w-[800px] mx-auto">
            <div
              onClick={() => setIsOpen(true)}
              className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden shadow-[0_8px_32px_rgba(11,71,133,0.12)] border border-gray-200/60 group cursor-pointer transition-all duration-300 hover:shadow-[0_16px_48px_rgba(11,71,133,0.18)] hover:-translate-y-0.5"
            >
              {/* Poster Image */}
              <Image
                src={posterUrl}
                alt={heading}
                fill
                priority
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 900px"
              />

              {/* Subtle dark overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1E3D]/60 via-[#0B1E3D]/20 to-transparent group-hover:from-[#0B1E3D]/50 transition-all duration-300" />

              {/* Play Button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative flex items-center justify-center">
                  {/* Outer ripple */}
                  <span className="absolute w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white/20 animate-ping pointer-events-none" />
                  {/* Main Play Circle */}
                  <div className="relative w-14 h-14 sm:w-18 sm:h-18 rounded-full bg-white/90 backdrop-blur-sm text-[#0B4785] flex items-center justify-center shadow-xl transition-transform duration-300 group-hover:scale-110 border border-white/60">
                    <Play className="w-6 h-6 sm:w-7 sm:h-7 fill-current ml-0.5" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Popup Modal */}
      <VideoModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        videoUrl={videoUrl}
        title={heading}
      />
    </>
  )
}
