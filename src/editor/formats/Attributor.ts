import Quill from "quill"
import Scope from "../quilljs/Scope.ts"

const parchment = Quill.import("parchment")

export interface AttributorOptions {
  scope?: Scope;
  whitelist?: string[];
}

export default class Attributor extends parchment.StyleAttributor {

  public constructor(
    attrName: string,
    keyName: string,
    options: AttributorOptions = {}) {
    super(attrName, keyName, options)
  }

  public add(node: HTMLElement, value: any) {
    node.setAttribute(this.getKey(), value)
    return true
  }

  public value(node: HTMLElement) {
    return node.getAttribute(this.getKey());
  }

  public remove(node: HTMLElement): void {
    node.removeAttribute(this.getKey())
  }

  protected getKey(): string {
    return `data-${this.keyName}`
  }
}