import Quill from "quill";

export default class EventDispatcher {

  static shared = new EventDispatcher()

  protected onMouseUpHandler: any = {}

  protected quill?: Quill

  public constructor() {
    this.onMouseUpHandler = this.onMouseUp.bind(this)
  }

  load(quill: Quill) {
    if (this.quill) return

    this.quill = quill
    quill.root.addEventListener('mouseup', this.onMouseUpHandler)
  }

  unload() {
    this.quill?.root?.removeEventListener?.('mouseup', this.onMouseUpHandler)
  }

  onMouseUp(_: MouseEvent) {
    this.quill?.getSelection()
  }

}