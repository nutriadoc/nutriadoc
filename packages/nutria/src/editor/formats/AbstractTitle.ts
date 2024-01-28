import Quill from "quill"

const Block = Quill.import("blots/block")

export default abstract class AbstractTitle extends Block {
  static level: number = 0

  static tagName: string = ""

  static create(value: number) {
    const dom = super.create(this.tagName) as HTMLElement

    if (value > 997)
      dom.classList.add(this.blotName)

    return dom
  }

  formats() {
    const blotName = this.statics.blotName.toLowerCase()
    if (this.domNode.classList.contains(blotName)) {
      const formats: any = {}
      formats[blotName] = this.statics.level
      return formats
    }

    return { header: parseInt(this.domNode.tagName.substring(1)) }
  }

  /**
   * this method call from clipboard convert
   *
   * @param domNode
   */
  static formats(domNode: HTMLElement): any {
    const blotName = this.blotName.toLowerCase()
    if (domNode.classList.contains(blotName)) {
      return this.level
    }

    return parseInt(domNode.tagName.substring(1))
  }
}