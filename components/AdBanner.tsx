"use client";

import { useEffect, useRef } from "react";

export default function AdBanner() {
  const adRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!adRef.current) return;

    // prevent loading twice
    if (adRef.current.dataset.loaded) return;
    adRef.current.dataset.loaded = "true";

    // create script for atOptions
    const configScript = document.createElement("script");
    configScript.innerHTML = `
      atOptions = {
        'key' : '0b7d5447f8ac6537721c9df29e968745',
        'format' : 'iframe',
        'height' : 50,
        'width' : 320,
        'params' : {}
      };
    `;

    // create invoke script
    const invokeScript = document.createElement("script");
    invokeScript.src = "https://www.highperformanceformat.com/0b7d5447f8ac6537721c9df29e968745/invoke.js";
    invokeScript.async = true;

    adRef.current.appendChild(configScript);
    adRef.current.appendChild(invokeScript);

  }, []);

  return <div ref={adRef}></div>;
}