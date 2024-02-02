import Nutria from './Nutria'
import Features from "@/app/Features";

export default async function Home() {
  const html = await loadReadme()
  return (
    <>
      <div className="container xl text-left px-10 py-20 md:w-3/6 xl:w-2/6 flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Collaborate, Offline, Toolbar</h1>
        <h2>Nutria is a a free rich editor and open source WYSIWYG.</h2>
        <h2>Use Nutria to help you build an useful editor, where text doesn&apos;t get lost, documents can be edited collaboratively, and the toolbar is like Office Word.</h2>
      </div>
      <div className="container xl md:w-3/6 xl:w-2/6 px-10 flex flex-col gap-2">
        <div className="text-slate-400">
          This project is still under development, you can add it to your wishlist, and we will soon notify you when it is officially available for use.
          {/*<a className="text-slate-800 mx-1" href="https://github.com/nutriadoc/nutriadoc">https://github.com/nutriadoc/nutriadoc</a>.*/}
        </div>
        {/*<div className="flex flex-col gap-2">*/}
        {/*  <input*/}
        {/*    className='rounded-lg border border-gray-500 p-2'*/}
        {/*    placeholder='input your email'*/}
        {/*  />*/}
        {/*  <button className="rounded-lg bg-gray-700 text-white p-2">Subscribe</button>*/}
        {/*</div>*/}
      </div>
      <div className="container main lg pt-20 px-5">
        <div
          id="container"
          className={"prose"}
          // dangerouslySetInnerHTML={{__html: html}}
        >
        </div>
        <Nutria html={html} />

      </div>
      <div className="bg-slate-50">
        <Features />
      </div>
    </>
  )
}

async function loadReadme() {
  const options = {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      workspace: "c08e611e-7d3d-4b6d-b324-b202c59d895d",
      key: "README"
    })
  }

  try {
    let response = await fetch("https://i.nutria-doc.com/document", options)
    const doc = await response.json()

    response = await fetch(
      `https://i.nutria-doc.com/document/html/${doc.id}`,
      {
        cache: "no-cache",
      }
    )
    return await response.text()
  } catch (e) {
    return ""
  }

}