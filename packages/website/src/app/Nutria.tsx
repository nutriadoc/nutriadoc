'use client'

import Script from "next/script";

function loadCSS(url: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const link = document.createElement('link')
    link.href = url
    link.rel = 'stylesheet'

    link.onload = () => {
      resolve()
    }

    link.onerror = () => {
      reject(new Error(`Failed to load CSS: ${url}`))
    }

    document.head.appendChild(link)
  })
}

export async function SetupNutria(url: string, html: string) {
  const nutria = (window as any)['Nutria']
  const doc = nutria.create(
    "#container",
    {
      key: 'demo-3',
    }
  )
  doc.addEventListener("ready", async () => {
    if (doc.element.querySelector("[data-embed-html]"))
      return
    doc.insertText(0, "\n", { html })
  })
}

export interface NutriaProps {
  html: string
}

export default function Nutria(props: NutriaProps) {
  const debug: boolean = false
  let nutriaUrl = "https://cdn.jsdelivr.net/npm/nutria@0.0.26/dist"
  if (debug) {
    nutriaUrl = "http://localhost:4173/"
  }

  return (
    <Script
      src={`${nutriaUrl}/nutria.umd.js`}
      onLoad={() => SetupNutria(nutriaUrl, props.html)}
    />
  )
}