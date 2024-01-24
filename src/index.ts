import View from "./ui/View.ts"
import Option from "./editor/Option.ts"
import IView from "./ui/IView.ts"
import Document from "./document/Document.ts"
import QuillDocument from "./editor/quilljs/QuillDocument.ts"
import Options from "./document/Options.ts"

import "./index.scss"

import pkg from "../package.json"
console.debug("current version " + pkg.version)

export function create(element?: string | Element | IView | View | undefined, option?: Option): Document {
  if (element === undefined) return new QuillDocument(option)

  let container: IView

  if (typeof element === 'string') {
    const dom = document.querySelector(element)
    if (!dom) throw new Error(`Element ${element} not found`)
    element = dom
  }

  if (element instanceof HTMLElement)
    container = new View(element)
  else if (element instanceof View)
    container = element

  if (!option) {
    option = {
    }
  }

  option.container = container!
  option = Options.setup(option)

  const doc = new QuillDocument(option)
  container!.addElement(doc)
  return doc
}

export interface Nutria {
  create: typeof create
  Document: typeof Document
}

if (window) {
  window.Nutria = {
    create,
    Document,
  }
}
