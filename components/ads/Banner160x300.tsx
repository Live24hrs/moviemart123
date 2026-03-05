'use client'

import { useEffect, useRef } from 'react'

export default function Banner160x300() {
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
    <meta name="viewport" content="width=160, height=300, initial-scale=1.0" />
    <style>
      html, body { margin:0; padding:0; width:160px; height:300px; overflow:hidden; background:transparent; }
    </style>
  </head>
  <body>
    <script>
      var atOptions = {
        'key' : 'a1c175bd3af90868bf75ee81eda6bc32',
        'format' : 'iframe',
        'height' : 300,
        'width' : 160,
        'params' : {}
      };
    </script>
    <script src="https://www.highperformanceformat.com/a1c175bd3af90868bf75ee81eda6bc32/invoke.js"></script>
  </body>
</html>`)
    doc.close()
  }, [])

  return (
    <div className="flex justify-center">
      <iframe
        ref={iframeRef}
        title="ad-banner-160x300"
        width={160}
        height={300}
        style={{ border: '0', overflow: 'hidden' }}
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
        scrolling="no"
      />
    </div>
  )
}
