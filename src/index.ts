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
import LineSpacing from "./editor/formats/LineSpacing.ts";
import Resizer from "./ui/resizer/Resizer.ts";
import Option from "./editor/Option.ts";
import WebsocketCollaboration from "./editor/collaboration/WebSocketCollaboration.ts";
import QuillCursors from "quill-cursors";

import 'quill/dist/quill.core.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import "./index.scss"


export class Document extends View {

  protected editorElement: HTMLDivElement

  protected toolbar: Toolbar

  protected _quill: Quill

  protected contents: string

  constructor(option?: Option) {
    const element = document.createElement("div")
    super(element)

    this.contents = option?.html ?? ""
    element.className = "ntr-doc"

    this.registerModules()

    this.editorElement = document.createElement("div")
    this._quill = new Quill(this.editorElement, { modules: { cursors: true } })

    if (option?.collaboration) {
      new WebsocketCollaboration(this._quill, option)
    }

    this._quill.root.addEventListener("blur", this.onQuillBlur.bind(this))

    this.toolbar = Toolbar.simple()
    const formatter = new Formatter(this._quill, [this.toolbar])
    this.toolbar.action = new ToolbarAction(this.toolbar, formatter)

    this.setupEditorElement()
    this.setupEvents()
  }

  protected setupEvents() {
    document.addEventListener("DOMContentLoaded", this.onDomContentLoaded.bind(this))

    const observer = new MutationObserver(this.onMutation.bind(this))
    observer.observe(this._quill.root, {childList: true, subtree: true})

    this._quill.root.addEventListener("dragover", (_e) => {
      // debugger
    })
  }

  protected onDomContentLoaded(event: Event) {
    if (event.target instanceof HTMLImageElement) {
      // debugger
    }
    console.debug(event.currentTarget)
  }

  protected onMutation(mutations: MutationRecord[]) {
    mutations.forEach((mutation) => {
      if (mutation.type == "childList") {
        mutation.addedNodes.forEach((node) => {
          if (node instanceof HTMLImageElement) {
            this.onImageLoad(node)
          }
        })
      }
    })
  }

  protected onImageLoad(image: HTMLImageElement) {
    new Resizer(image)
  }

  /**
   * @param e
   * @protected
   */
  protected onQuillBlur(e: FocusEvent) {
    e.preventDefault()
    this._quill.root.focus()
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
      "formats/linespacing": new LineSpacing('linespacing', 'linespacing', { /*scope: Scope.INLINE*/ }),
    })

    Quill.register('modules/cursors', QuillCursors);
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
  }


  public get quill(): Quill {
    return this._quill
  }
}



export function create (element: string | HTMLElement, option?: Option): Document {
  const doc = new Document(option)
  const docEle = doc.render()

  if (element instanceof HTMLElement)
    element.append(docEle as HTMLElement)

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