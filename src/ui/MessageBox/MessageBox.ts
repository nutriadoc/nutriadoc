import View from "../View.ts";
import {className, on} from "../views.ts";
import MessageBoxMode from "./MessageBoxMode.ts";
import TinyMessageBox from "./Tiny/TinyMessageBox.ts";
import MessageBoxComponent from "./MessageBoxComponent.ts";
import DetailMessageBox from "./Detail/DetailMessageBox.ts";
import SimpleMessageBox from "./Simple/SimpleMessageBox.ts";
import MessageView from "./MessageView.ts";
import SummaryMessageView from "./SummaryMessageView.ts";
import Message from "./Message.ts";

export default class MessageBox extends View {

  protected _mode: MessageBoxMode = MessageBoxMode.Tiny

  protected tiny: MessageBoxComponent

  protected detail: MessageBoxComponent

  protected simple: MessageBoxComponent

  protected summary: SummaryMessageView

  protected messages: MessageView[] = []

  protected currentSimpleMessage: MessageView | undefined

  protected components: Map<MessageBoxMode, MessageBoxComponent> = new Map<MessageBoxMode, MessageBoxComponent>();

  public constructor(mode?: MessageBoxMode, summary?: SummaryMessageView) {
    super(undefined, className("ntr-message-box", "ntr-box"))

    mode = mode ?? MessageBoxMode.Hidden

    this.tiny = new TinyMessageBox(on("expand", this.onMessageBoxExpand.bind(this)))
    this.detail = new DetailMessageBox(on("expand", this.onMessageBoxExpand.bind(this)))
    this.simple = new SimpleMessageBox(on("expand", this.onMessageBoxExpand.bind(this)))
    this.summary = summary ?? new SummaryMessageView()

    this.components.set(MessageBoxMode.Tiny, this.tiny)
    this.components.set(MessageBoxMode.Detail, this.detail)
    this.components.set(MessageBoxMode.Simple, this.simple)

    this.components.forEach(component => { this.addElement(component)})

    this.setMode(mode)

    console.debug("MessageBox created", { id: this.id })
  }

  public setMode(mode: MessageBoxMode) {
    this._mode = mode

    this.components.forEach((component, key) => {
      if (key === mode) {
        this.addClass(`model-${key}`)
        console.debug(`visible ${key}`)
        component.visible()
      } else {
        this.removeClass(`model-${key}`)
        console.debug(`hide ${key}`)
        component.hide()
      }
    })
  }

  public addMessage(message: MessageView) {
    this.messages.push(message)

  }

  public removeMessage(message: MessageView) {

  }

  activeMessage(message: MessageView): void
  activeMessage(key: string): void
  activeMessage(key: string | MessageView): void {
    if (this._mode == MessageBoxMode.Tiny) {
      this.switchToSimpleMessage(key)
    } else if (this._mode == MessageBoxMode.Simple) {

    } else if (this._mode == MessageBoxMode.Detail) {
      this.scrollToMessage(this._mode, "")
    } else {
      this.switchToSimpleMessage(key)
    }
  }

  switchToSimpleMessage(key: string | MessageView): void {
    if (typeof key === "string")
      this.currentSimpleMessage = this.findMessage(key)
    else
      this.currentSimpleMessage = key

    this.setMode(MessageBoxMode.Simple)

    if (!this.currentSimpleMessage) return
    const box = this.simple as SimpleMessageBox
    box.setMessage(this.currentSimpleMessage)
  }

  public scrollToMessage(model: MessageBoxMode, key: string) {

  }

  public displaySummary() {

  }

  public deactivateMessage() {
    if (this._mode == MessageBoxMode.Simple) {
      this.displaySummary()
    }
  }

  protected findMessage(key: string): MessageView | undefined {
    return undefined
  }

  protected onMessageBoxExpand() {
    switch (this._mode) {
      case MessageBoxMode.Tiny:
        this.setMode(MessageBoxMode.Simple)
        break
      case MessageBoxMode.Simple:
        this.setMode(MessageBoxMode.Detail)
        break
    }
  }

  public get mode(): MessageBoxMode {
    return this._mode
  }

  public set mode(value: MessageBoxMode) {
    this.setMode(value)
  }
}