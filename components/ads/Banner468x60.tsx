'use client'

import { useEffect, useRef } from 'react'

export default function Banner468x60() {
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
    <meta name="viewport" content="width=468, height=60, initial-scale=1.0" />
    <style>
      html, body { margin:0; padding:0; width:468px; height:60px; overflow:hidden; background:transparent; }
    </style>
  </head>
  <body>
    <script>
      var atOptions = {
        'key' : '32059ca666de179a5e76687904a36121',
        'format' : 'iframe',
        'height' : 60,
        'width' : 468,
        'params' : {}
      };
    </script>
    <script src="https://heavinessslight.com/32059ca666de179a5e76687904a36121/invoke.js"></script>
  </body>
</html>` )
    doc.close()
  }, [])

  return (
    <div className="flex justify-center">
      <iframe
        ref={iframeRef}
        title="ad-banner-468x60"
        width={468}
        height={60}
        style={{ border: '0', overflow: 'hidden' }}
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
        scrolling="no"
      />
    </div>
  )
}
