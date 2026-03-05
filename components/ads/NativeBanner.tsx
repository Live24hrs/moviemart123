'use client'

import { useEffect, useRef } from 'react'

export default function NativeBanner() {
  const iframeRef = useRef<HTMLIFrameElement | null>(null)

  useEffect(() => {
    const iframe = iframeRef.current
    if (!iframe) return

    const doc = iframe.contentDocument || iframe.contentWindow?.document
    if (!doc) return

    doc.open()
    doc.write(`<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <style>
      html, body { margin:0; padding:0; width:100%; height:100%; overflow:hidden; background:transparent; }
      #container-bfe6cae2548b772c2f885a3e6a807198 { width: 100%; }
    </style>
  </head>
  <body>
    <div id="container-bfe6cae2548b772c2f885a3e6a807198"></div>
    <script async="async" data-cfasync="false" src="https://pl28843952.effectivegatecpm.com/bfe6cae2548b772c2f885a3e6a807198/invoke.js"></script>
  </body>
</html>`)
    doc.close()
  }, [])

  // height is flexible; 250 is a safe “native” container size
  return (
    <div className="w-full flex justify-center">
      <iframe
        ref={iframeRef}
        title="ad-native"
        className="w-full max-w-[720px]"
        height={250}
        style={{ border: '0', overflow: 'hidden' }}
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
        scrolling="no"
      />
    </div>
  )
}
