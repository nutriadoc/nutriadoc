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

  await loadCSS(`${url}/style.css`)

  const nutria = (window as any)['Nutria']
  const doc = nutria.create(
    "#container",
    {
      key: 'demo'
    }
  )
  console.debug(doc)
  // doc.insertEmbed(0, 'html', html)
  doc.insertText(0, "Align left", { align: "left" })
}

export interface NutriaProps {
  html: string
}

export default async function Nutria(props: NutriaProps) {
  const debug: boolean = true
  let nutriaUrl = "https://cdn.jsdelivr.net/npm/@nutriadoc/nutriadoc@0.0.5/dist"
  if (debug) {
    nutriaUrl = "http://localhost:4173"
  }

  return (
    <Script
      src={`${nutriaUrl}/nutria.umd.js`}
      onLoad={() => SetupNutria(nutriaUrl, props.html)}
      // onLoad={() => {console.debug("loaded")}}
    />
  )
}