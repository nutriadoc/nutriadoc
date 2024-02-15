import { View, IView } from "@nutriadoc/classes"
import Option from "./editor/Option.ts"
import Document from "./document/Document.ts"
import QuillDocument from "./editor/quilljs/QuillDocument.ts"
import Options from "./document/Options.ts"

import "./index.scss"
// console.debug("current version " + pkg.version)

type ContainerElement = string | Element | IView | View | undefined

function initializeElement(element: ContainerElement, option: Option) {
  let view: IView | undefined

  if (typeof element === 'string') {
    const dom = document.querySelector(element)
    if (!dom) throw new Error(`Element ${element} not found`)
    element = dom
  }

  if (element instanceof HTMLElement)
    view = new View(element)
  else if (element instanceof View)
    view = element

  option.container = view

  return view
}

export function create(element?: ContainerElement, option?: Option): Document {
  option = option ?? {}
  let view = initializeElement(element, option)
  option = Options.setup(option)

  const doc = new QuillDocument(option)
  if (view) view.add(doc)

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

export * from './editor'
export * from './document'