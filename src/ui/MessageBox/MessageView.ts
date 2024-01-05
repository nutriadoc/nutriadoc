import Message from "./Message.ts";
import MessageEvent from "./MessageEvent.ts";

export default abstract class MessageView {

  protected _messageTarget: EventTarget

  protected _message: Message

  protected constructor(message: Message, messageTarget: EventTarget) {
    this._message = message
    this._messageTarget = messageTarget
  }

  abstract update(message: Message): void

  protected onMessageUpdate(event: Event) {
    const e = event as MessageEvent
    this.update(e.message)
  }
}