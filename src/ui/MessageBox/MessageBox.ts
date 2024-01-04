import View from "../View.ts";
import {className, on} from "../views.ts";
import MessageBoxMode from "./MessageBoxMode.ts";
import TinyMessageBox from "./Tiny/TinyMessageBox.ts";
import MessageBoxComponent from "./MessageBoxComponent.ts";
import DetailMessageBox from "./Detail/DetailMessageBox.ts";
import SimpleMessageBox from "./Simple/SimpleMessageBox.ts";

export default class MessageBox extends View {

  protected _mode: MessageBoxMode = MessageBoxMode.Tiny

  protected tiny: MessageBoxComponent

  protected detail: MessageBoxComponent

  protected simple: MessageBoxComponent

  protected components: Map<MessageBoxMode, MessageBoxComponent> = new Map<MessageBoxMode, MessageBoxComponent>();

  public constructor(mode: MessageBoxMode) {
    super(undefined, className("ntr-message-box", "ntr-box"))

    this.tiny = new TinyMessageBox(on("expand", this.onMessageBoxExpand.bind(this)))
    this.detail = new DetailMessageBox(on("expand", this.onMessageBoxExpand.bind(this)))
    this.simple = new SimpleMessageBox(on("expand", this.onMessageBoxExpand.bind(this)))

    this.components.set(MessageBoxMode.Tiny, this.tiny)
    this.components.set(MessageBoxMode.Detail, this.detail)
    this.components.set(MessageBoxMode.Simple, this.simple)

    this.components.forEach(component => { this.addElement(component)})

    this.setMode(mode)
  }

  public setMode(mode: MessageBoxMode) {
    this._mode = mode

    this.components.forEach((component, key) => {
      if (key === mode) {
        this.addClass(`model-${key}`)
        component.visible()
      } else {
        this.removeClass(`model-${key}`)
        component.hide()
      }
    })
  }

  protected onMessageBoxExpand() {
    this.setMode(MessageBoxMode.Simple)
  }

  public get mode(): MessageBoxMode {
    return this._mode
  }

  public set mode(value: MessageBoxMode) {
    this.setMode(value)
  }
}