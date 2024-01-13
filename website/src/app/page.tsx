import {GetServerSideProps } from 'next'
import Nutria from './Nutria'
import Script from 'next/script'

type PageProps = {
  data: string
}

export default async function Home() {
  let response = await fetch(
    "https://i.nutria-doc.com/document",
    {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        workspace: "c08e611e-7d3d-4b6d-b324-b202c59d895d",
        key: "README"
      })
    })
  const doc = await response.json()

  response = await fetch(
    `https://i.nutria-doc.com/document/html/${doc.id}`,
    )
  const html = await response.text()

  return (
    <div className="main">
      <div id="container" className={"prose"} dangerouslySetInnerHTML={{__html: html}}>
      </div>
      <Script
        src="https://cdn.jsdelivr.net/npm/@nutriadoc/nutriadoc@0.0.5/dist/nutria.umd.js"
        // src="http://localhost:5173/dist/nutria.umd.js"
        onLoad={Nutria}  
      />
    </div>
  )
}
