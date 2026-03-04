"use client";

export default function AdBanner() {
  const srcDoc = `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=320, height=50, initial-scale=1.0" />
    <style>
      html,body{margin:0;padding:0;width:320px;height:50px;overflow:hidden;background:transparent;}
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
</html>`;

  return (
    <div className="flex justify-center">
      <iframe
        title="ad-banner"
        width={320}
        height={50}
        style={{ border: 0, overflow: "hidden" }}
        scrolling="no"
        // ✅ NO allow-same-origin (this is the big change)
        sandbox="allow-scripts allow-forms allow-popups"
        srcDoc={srcDoc}
      />
    </div>
  );
}
