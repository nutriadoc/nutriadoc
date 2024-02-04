'use client'

import Script from "next/script";
import {useLayoutEffect} from "react";


// ISSUES:
// - 仅文档完全加载完成后才显示
export async function SetupNutria(url: string, html: string) {
  const container = document.getElementById("container")!
  const nutria = (window as any)['Nutria']

  const height = container.offsetWidth * 0.5
  container.style.height = `${height}px`
  const doc = nutria.create(container, { key: 'demo-3' })


  doc.addEventListener("ready", async () => {
    // if (doc.element.querySelector("[data-embed-html]"))
    //   return
    // doc.insertText(0, "\n", { html })
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

  useLayoutEffect(() => {
    if (document.querySelector("#nutria-script")) return

    const script = document.createElement("script")
    script.id = "nutria-script"
    script.type = 'module'
    script.innerHTML = `
import { Ring } from "@nutriadoc/components";
const container = document.getElementById("container")

var ring = new Ring({
  container,
  size: 20,
  borderWidth: 2,
})
ring.infinite = true
    `
    document.body.appendChild(script)
  }, [])

  return (
    <>
      <Script
        src={`${nutriaUrl}/nutria.umd.js`}
        onLoad={() => SetupNutria(nutriaUrl, props.html)}
        defer={true}
      />
    </>
  )
}