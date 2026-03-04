"use client";

import { useEffect, useRef } from "react";

export default function AdBanner() {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const doc = iframe.contentDocument || iframe.contentWindow?.document;
    if (!doc) return;

    // Write the ad code INSIDE the iframe (isolated from React DOM)
    doc.open();
    doc.write(`
      <!doctype html>
      <html>
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=320, height=50, initial-scale=1.0" />
          <style>
            html, body { margin:0; padding:0; width:320px; height:50px; overflow:hidden; background:transparent; }
          </style>
        </head>
        <body>
          <script>
            var atOptions = {
              'key' : '0b7d5447f8ac6537721c9df29e968745',
              'format' : 'iframe',
              'height' : 50,
              'width' : 320,
              'params' : {}
            };
          </script>
          <script src="https://www.highperformanceformat.com/0b7d5447f8ac6537721c9df29e968745/invoke.js"></script>
        </body>
      </html>
    `);
    doc.close();
  }, []);

  return (
    <div className="flex justify-center">
      <iframe
        ref={iframeRef}
        title="ad-banner"
        width={320}
        height={50}
        style={{ border: "0", overflow: "hidden" }}
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
        scrolling="no"
      />
    </div>
  );
}
