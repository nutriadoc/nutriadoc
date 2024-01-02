import Quill from "quill";

const BlockEmbed = Quill.import("blots/block/embed")

export default class InlineToolbarBlock extends BlockEmbed {

  static blotName = 'inline-toolbar';
  static tagName = ['div'];
  static className = 'inline-toolbar'

  static create(value: unknown): Node {
    const node = super.create("div") as HTMLElement
    node.classList.add(value as string)
    return node
  }
}