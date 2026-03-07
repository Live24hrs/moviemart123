'use client'

import { useEffect, useRef } from 'react'

export default function Banner728x90() {
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
    <meta name="viewport" content="width=728, height=90, initial-scale=1.0" />
    <style>
      html, body { margin:0; padding:0; width:728px; height:90px; overflow:hidden; background:transparent; }
    </style>
  </head>
  <body>
    <script>
      var atOptions = {
        'key' : '988ca92ea1b89516faa746245aaf524e',
        'format' : 'iframe',
        'height' : 90,
        'width' : 728,
        'params' : {}
      };
    </script>
    <script src="https://heavinessslight.com/988ca92ea1b89516faa746245aaf524e/invoke.js"></script>
  </body>
</html>` )
    doc.close()
  }, [])

  return (
    <div className="flex justify-center">
      <iframe
        ref={iframeRef}
        title="ad-banner-728x90"
        width={728}
        height={90}
        style={{ border: '0', overflow: 'hidden' }}
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
        scrolling="no"
      />
    </div>
  )
}
