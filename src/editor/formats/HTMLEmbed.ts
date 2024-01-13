import Quill from "quill";

const EmbedBlot = Quill.import("blots/block/embed")

export default class HTMLEmbed extends EmbedBlot {
  static blotName = "html"
  static tagName = "div"

  format(name: string, value: string) {
    console.debug({name, value})
    super.format(name, value)
  }

  static create(value: any) {
    const node = super.create(value) as HTMLElement
    node.innerHTML = value
    node.setAttribute("contenteditable", "false")
    return node
  }

  static value(domNode: HTMLElement) {
    return domNode.innerHTML
  }
}