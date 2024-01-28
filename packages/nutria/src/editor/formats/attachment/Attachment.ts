import Quill from "quill";
import Scope from "../../quilljs/Scope.ts";
import MediaComponent from "../../behavior/components/MediaComponent.ts";

const parchment = Quill.import("parchment")

export class AttachmentAttributor extends parchment.StyleAttributor {

  protected domNode!: HTMLLinkElement

  add(node: HTMLElement, value: string) {
    this.domNode = node as HTMLLinkElement
    this.setAttribute(node, value)
    new MediaComponent(this)
    return true
  }

  protected setAttribute(node: HTMLElement, value: string) {
    node.setAttribute(this.keyName, value)
  }

  value(node: HTMLElement) {
    return node.getAttribute(this.keyName);
  }

  format(name: string, value: string) {
    if ('src' == name) {
      this.domNode.href = value
    }

    if ('attachment' == name) {
      this.setAttribute(this.domNode, value)
    }
  }

  get src(): string {
    return this.value(this.domNode) as string
  }

  get name(): string {
    return "attachment"
  }

  get node(): Node {
    return this.domNode
  }
}

// @ts-ignore
const Attachment = new AttachmentAttributor("attachment", "attachment", { scope: Scope.INLINE })

export default Attachment