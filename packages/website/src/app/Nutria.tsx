'use client'

import {useLayoutEffect} from "react"
import {PackageManager} from "@nutriadoc/classes";

export interface NutriaProps {
  html: string
}

export default function Nutria(props: NutriaProps) {

  useLayoutEffect(() => {
    const container = document.getElementById("container")!
    const height = container.offsetWidth * 0.5
    container.style.height = `${height}px`

    if (document.querySelector("#nutria-script")) return

    const script = document.createElement("script")
    script.id = "nutria-script"
    script.type = 'module'
    script.defer = true
    script.innerHTML = `
import { Ring } from "@nutriadoc/components"
if (!window['Nutria']) {
  
  const container = document.getElementById("container")
  
  var ring = new Ring({
    container,
    size: 20,
    borderWidth: 2,
  })
  ring.infinite = true
  
  window['default_ring'] = ring
}
    `
    document.body.appendChild(script)

    const nutriaScript = document.createElement("script")
    nutriaScript.src = PackageManager.shared.getUmdUrl()
    nutriaScript.defer = true
    nutriaScript.id = "nutria-umd"

    nutriaScript.onload = () => {

      const ring = window['default_ring']

      const nutria = (window as any)['Nutria']
      const doc = nutria.create(container, { key: 'demo-3' })

      doc.addEventListener("ready", async () => {

        if (!!ring)
          ring.infinite = false

        // if (doc.element.querySelector("[data-embed-html]"))
        //   return
        // doc.insertText(0, "\n", { html })
      })
    }


    document.body.appendChild(nutriaScript)

  }, [])

  return (
    <>
    </>
  )
}