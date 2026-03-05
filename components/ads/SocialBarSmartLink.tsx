'use client'

import Script from 'next/script'

// User provided: Social Bar ad + Smart Link ad (same script URL)
// Load once, globally.
export default function SocialBarSmartLink() {
  return (
    <Script
      src="https://pl28846865.effectivegatecpm.com/ed/ea/11/edea1146511023733b1efa7c4940a8f1.js"
      strategy="afterInteractive"
    />
  )
}
