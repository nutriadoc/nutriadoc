import Message from "./Message.ts";
import MessageEvent from "./MessageEvent.ts";
import View from "../View.ts";
import {className} from "../views.ts";

export default abstract class MessageView extends View {

  public constructor() {
    super(undefined, className("message-view"))
  }

  abstract update(message: Message): void

  protected onMessageUpdate(event: Event) {
    const e = event as MessageEvent
    this.update(e.message)
  }
}