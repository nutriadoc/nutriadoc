import View from "./ui/View.ts";
import Option from "./editor/Option.ts";
import IView from "./ui/IView.ts";
import Document from "./document/Document.ts";
import QuillDocument from "./editor/quilljs/QuillDocument.ts";

import 'bootstrap-icons/font/bootstrap-icons.css'
import "./index.scss"

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

  const doc = new QuillDocument(option)
  container!.addElement(doc)
  return doc
}

export interface NutriaDoc {
  create: typeof create
  Document: typeof Document
}

if (window) {
  window.NutriaDoc = {
    create,
    Document,
  }
}