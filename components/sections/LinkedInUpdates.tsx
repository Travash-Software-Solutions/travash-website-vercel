'use client'

import React, { useEffect } from 'react'

export default function LinkedInUpdates() {
  useEffect(() => {
    // Inject the SociableKit script dynamically on mount to ensure it executes properly
    const scriptId = 'sk-widget-script'
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script')
      script.id = scriptId
      script.src = 'https://widgets.sociablekit.com/linkedin-page-posts/widget.js'
      script.defer = true
      document.body.appendChild(script)
    }
  }, [])

  return (
    <section className="py-12 lg:py-16 bg-white font-['Plus_Jakarta_Sans',sans-serif]">
      <div className="max-w-[94rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-5 lg:mb-5">
          <h2 className="section-heading-title">Follow Our Updates</h2>
        </div>
        
        {/* SociableKit LinkedIn Widget Container */}
        <div className="w-full max-w-[84rem] mx-auto min-h-[400px]">
          <div className="sk-ww-linkedin-page-post" data-embed-id="25719687"></div>
        </div>
      </div>
    </section>
  )
}
