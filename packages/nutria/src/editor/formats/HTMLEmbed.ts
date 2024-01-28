import Quill from "quill";

const EmbedBlot = Quill.import("blots/block/embed")

export default class HTMLEmbed extends EmbedBlot {
  static blotName = "html"
  static tagName = "div"

  format(name: string, value: string) {
    super.format(name, value)
  }

  static create(value: any) {
    const node = super.create(value) as HTMLElement
    node.innerHTML = value
    node.setAttribute("contenteditable", "false")
    node.setAttribute("data-embed-html", "")
    return node
  }

  static value(domNode: HTMLElement) {
    return domNode.innerHTML
  }
}