import {GetServerSideProps } from 'next'
import Nutria from './Nutria'
import Script from 'next/script'



export default async function Home() {
  const html = await loadReadme()

  return (
    <div className="main">
      <div
        id="container"
        className={"prose"}
        // dangerouslySetInnerHTML={{__html: html}}
      >
      </div>


      <Nutria html={html} />
    </div>
  )
}

async function loadReadme() {
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
  return await response.text()
}