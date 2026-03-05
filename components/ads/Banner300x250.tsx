'use client'

import { useEffect, useRef } from 'react'

export default function Banner300x250() {
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
    <meta name="viewport" content="width=300, height=250, initial-scale=1.0" />
    <style>
      html, body { margin:0; padding:0; width:300px; height:250px; overflow:hidden; background:transparent; }
    </style>
  </head>
  <body>
    <script>
      var atOptions = {
        'key' : '06a164e6c6420e4c9e0f0032fa60daba',
        'format' : 'iframe',
        'height' : 250,
        'width' : 300,
        'params' : {}
      };
    </script>
    <script src="https://www.highperformanceformat.com/06a164e6c6420e4c9e0f0032fa60daba/invoke.js"></script>
  </body>
</html>`)
    doc.close()
  }, [])

  return (
    <div className="flex justify-center">
      <iframe
        ref={iframeRef}
        title="ad-banner-300x250"
        width={300}
        height={250}
        style={{ border: '0', overflow: 'hidden' }}
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
        scrolling="no"
      />
    </div>
  )
}
