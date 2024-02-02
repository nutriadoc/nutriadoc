interface Feature {
  headline: string
  description: string
}

const features = [
  {
    headline: "🤝 Collaborative",
    description: "Different people can edit the same document in real time. Even if offline, you can continue to work and restore content when the network is restored."
  },
  {
    headline: "🖋️ All formats",
    description: "Nutria is as easy to use as Office Word, with almost all text formats available. Clipboard, fonts, paragraphs, styles, media files, tables, horizontal lines, links, and even code."
  },
  {
    headline: "🔨 Toolbars",
    description: "Nutria has a toolbar similar to Office Word, in addition, it also has a selection toolbar and a toolbar for entire lines of text.",
  },
  {
    headline: "☁️ Cloud",
    description: "Nutria provides a one-stop solution for document storage and computation. You don't have to worry about how to handle these documents, whether it's storage, reading, or other functions. Nutria provides available APIs."
  }
]

export default function Features() {
  return (
    <div className={"features container lg:px-40 lg:py-40 py-10 px-5"}>
      <div className={"text-4xl font-bold text-center my-20"}><h2>Features</h2></div>
      <div className={"grid lg:grid-cols-2 sm:grid-cols-1 gap-20"}>
        {features.map((feature: Feature, index: number) => (
        <div
          className={"flex flex-col gap-2"}
          key={index}
        >
          <h3 className={"text-3xl font-bold"}>{feature.headline}</h3>
          <p>{feature.description}</p>
        </div>
        ))}
      </div>
    </div>
  )
}