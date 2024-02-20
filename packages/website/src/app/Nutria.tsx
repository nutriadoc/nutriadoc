'use client'

import {useLayoutEffect} from "react"

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

const container = document.getElementById("container")

var ring = new Ring({
  container,
  size: 20,
  borderWidth: 2,
})
ring.infinite = true

import { PackageManager } from "@nutriadoc/classes"
PackageManager.shared.devMode()

const nutriaScript = document.createElement("script")
console.debug(PackageManager)
nutriaScript.src = PackageManager.shared.getUmdUrl("nutria")
nutriaScript.defer = true
nutriaScript.id = "nutria-umd"

nutriaScript.onload = () => {

  const ring = window['default_ring']

  const nutria = window['Nutria']
  const doc = nutria.create(container, { key: 'demo-3' })
  console.debug('on load')

  doc.addEventListener("ready", async () => {

    if (!!ring)
      ring.infinite = false

    // if (doc.element.querySelector("[data-embed-html]"))
    //   return
    // doc.insertText(0, "\\n", { html })
  })
}
document.body.appendChild(nutriaScript)
    `
    document.body.appendChild(script)



  }, [])

  return (
    <>
    </>
  )
}