import Quill, { DeltaOperation } from "quill";
import MainToolbar from "./toolbar/main/MainToolbar";
import AbstractElement from "./ui/AbstractElement";
import IElement from "./ui/IElement";

import { ScrollBlot } from "parchment"
import { Blot } from "parchment/dist/typings/blot/abstract/blot"

import 'quill/dist/quill.core.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

class Document extends AbstractElement {

  protected editorElement: HTMLDivElement

  protected toolbarElement: IElement

  protected quill?: Quill

  protected contents: string

  constructor(contents: string) {
    const element = document.createElement("div")
    super(element)

    this.contents = contents

    element.className = "ntr-doc"

    this.editorElement = document.createElement("div")
    this.toolbarElement = MainToolbar.simple()
    this.setupEditorElement()
  }

  public render(): Node | Node[] {

    this.addElement(this.toolbarElement)
    this.addNode(this.editorElement)
    
    this.quill = new Quill(this.editorElement)

    const text = this.quill.clipboard.convert(this.contents)
    this.quill.setContents(text)

    this.quill.insertText(this.quill.getLength(), "Line")


    this.quill.root.addEventListener("mousemove", this.onMouseMove.bind(this))
    this.quill.on("editor-change", this.onEditorChange.bind(this))

    setTimeout(() => {
      const p = document.querySelectorAll(".ql-editor p")[1]

      this.quill?.insertText(this.nextLineByNode(p), "test new line\n")

    }, 1000)
    

    return this.element
  }

  protected get scroll(): ScrollBlot {
    return this.quill!.scroll as unknown as ScrollBlot
  }

  protected findBlot(dom: Node): Blot | undefined {
    let found: Blot | undefined

    this.scroll.children.forEach((blot) => {
      if (blot.domNode == dom) {
        found = blot
        return false
      }

      return true
    })

    return found
  }

  protected nextLineByNode(dom: Node): number {
    const blot = this.findBlot(dom)
    if (!blot) return -1
    return this.nextLine(blot)
  }

  protected nextLine(blot: Blot) {
    const index = this.quill!.getIndex(blot)
    return index + blot.length() 
  }

  protected setupEditorElement() {
    this.editorElement.className = "ntr-editor"
  }

  protected onMouseMove(event: MouseEvent) {
    // const element = event.target as HTMLElement
    // const rect = element.getBoundingClientRect()

    // this.quill?.getLeaf

    // console.debug(rect)
  }

  protected onEditorChange(name: string, delta: any) {
    console.debug(name, delta)
  }
}



export default function (element: string | HTMLElement, contents?: string) {
  const doc = new Document(contents ?? "")
  const docEle = doc.render()

  if (element instanceof HTMLElement)
    element.append(docEle as HTMLElement)
}