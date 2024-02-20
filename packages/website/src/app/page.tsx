import Nutria from './Nutria'
import Features from "@/app/Features"
import Pricing from "@/app/Pricing"
import WantList from "@/app/WantList";

export default async function Home() {
  // const html = await loadReadme()

  return (
    <>
      <div className={"container grid lg:grid-cols-3 lg:grid-flow-row sm:grid-cols-1 lg:py-40 lg:px-40 p-5"}>
        {/* px-10 py-20 md:w-3/6 xl:w-2/6 */}
        <div className="text-left flex flex-col gap-4 col-span-2 lg:px-10 py-10">
          <h1 className="text-5xl font-bold">Collaborate, Offline, Toolbar</h1>
          <h2 className={"text-xl"}>Nutria is a a free rich editor and open source WYSIWYG.</h2>
          <h2 className={"text-xl"}>Use Nutria to help you build an useful editor, where text doesn&apos;t get lost, documents can be edited collaboratively, and the toolbar is like Office Word.</h2>
        </div>
        <div className="flex flex-col gap-5">
          <div className="text-slate-400">
            This project is still under development, you can add it to your wishlist, and we will soon notify you when it
            is officially available for use.
          </div>
          <WantList />
        </div>
      </div>
      <div className="container main lg pt-20 px-5">
        <div
          id="container"
          className={"prose flex justify-center align-middle"}
          // dangerouslySetInnerHTML={{__html: html}}
        >
        </div>
        <Nutria html={""} />

      </div>
      <div className="bg-slate-50">
        <Features />
      </div>
      <div className={"lg:pt-20 px-5 lg:py-20 py-10"}>
        <Pricing />
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