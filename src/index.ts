import Quill from "quill";
import Toolbar from "./ui/toolbar/main/Toolbar.ts";
import View from "./ui/View.ts";
import Formatter from "./editor/formatter/Formatter.ts";
import Title from "./editor/formats/Title.ts";

import {ScrollBlot} from "parchment"
import {Blot} from "parchment/dist/typings/blot/abstract/blot"
import {FontFamily, FontFamilyClass} from "./editor/formats/FontFamily.ts";
import Subtitle from "./editor/formats/Subtitle.ts";
import ToolbarAction from "./ui/toolbar/main/ToolbarAction.ts";
import FontSize from "./editor/formats/FontSize.ts";

import 'quill/dist/quill.core.css'
import 'bootstrap-icons/font/bootstrap-icons.css'


class Document extends View {

  protected editorElement: HTMLDivElement

  protected toolbar: Toolbar

  protected _quill: Quill

  protected contents: string

  constructor(contents: string) {
    const element = document.createElement("div")
    super(element)

    this.contents = contents
    element.className = "ntr-doc"

    this.registerModules()

    this.editorElement = document.createElement("div")
    this._quill = new Quill(this.editorElement)

    this.toolbar = Toolbar.simple()
    const formatter = new Formatter(this._quill, this.toolbar)
    this.toolbar.action = new ToolbarAction(this.toolbar, formatter)

    this.setupEditorElement()
  }

  protected registerModules() {
    Quill.register({
      "attributors/class/font": FontFamilyClass,
      "attributors/style/font": FontFamily,
    },true)

    Quill.register({
      "formats/font": FontFamily,
    }, true)

    Quill.register({
      "formats/title": Title,
      "formats/subtitle": Subtitle,
      "formats/font-size": FontSize,
    })
  }

  public render(): Node | Node[] {

    this.addElement(this.toolbar)
    this.addNode(this.editorElement)

    const text = this._quill.clipboard.convert({html: this.contents})
    this._quill.setContents(text)
    this._quill?.focus()

    this._quill.root.addEventListener("mousemove", this.onMouseMove.bind(this))
    // this.quill.on("editor-change", this.onEditorChange.bind(this))

    return this.element
  }

  protected get scroll(): ScrollBlot {
    return this._quill!.scroll as unknown as ScrollBlot
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
    const index = this._quill!.getIndex(blot)
    return index + blot.length() 
  }

  protected setupEditorElement() {
    this.editorElement.className = "ntr-editor"
  }

  protected onMouseMove(_event: MouseEvent) {
    // const element = event.target as HTMLElement
    // const rect = element.getBoundingClientRect()

    // this.quill?.getLeaf

    // console.debug(rect)
  }

  protected onEditorChange(name: string, delta: any) {
    console.debug(name, delta)
  }

  public get quill(): Quill {
    return this._quill
  }
}



export default function (element: string | HTMLElement, contents?: string): Document {
  const doc = new Document(contents ?? "")
  const docEle = doc.render()

  if (element instanceof HTMLElement)
    element.append(docEle as HTMLElement)

  return doc
}