'use client'

import { useEffect, useRef } from 'react'

export default function Banner160x600() {
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
    <meta name="viewport" content="width=160, height=600, initial-scale=1.0" />
    <style>
      html, body { margin:0; padding:0; width:160px; height:600px; overflow:hidden; background:transparent; }
    </style>
  </head>
  <body>
    <script>
      var atOptions = {
        'key' : '775f723359ca978452941bd92715297b',
        'format' : 'iframe',
        'height' : 600,
        'width' : 160,
        'params' : {}
      };
    </script>
    <script src="https://heavinessslight.com/775f723359ca978452941bd92715297b/invoke.js"></script>
  </body>
</html>` )
    doc.close()
  }, [])

  return (
    <div className="flex justify-center">
      <iframe
        ref={iframeRef}
        title="ad-banner-160x600"
        width={160}
        height={600}
        style={{ border: '0', overflow: 'hidden' }}
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
        scrolling="no"
      />
    </div>
  )
}
