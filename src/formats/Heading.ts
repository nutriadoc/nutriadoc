import Quill from "quill";

const Block = Quill.import('blots/block')

export default class Header extends Block {

  static blotName = 'header';
  static tagName = ['H1', 'H2', 'H3', 'H4', 'H5', 'H6'];

  static create(value: any) {
    const n = super.create(value)

    if (typeof(value) === 'string') {
      n.setAttribute('class', `ntr-${value}`)
    }
    return n
  }

  static registerBlot() {
    Quill.register("formats/header", Header, true)
  }
}
