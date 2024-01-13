'use client'

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

export default async function Nutria() {

  await loadCSS("https://cdn.jsdelivr.net/npm/@nutriadoc/nutriadoc@0.0.5/dist/style.css")

  const nutria = (window as any).Nutria
  nutria.create(
    "#container"
  )
}