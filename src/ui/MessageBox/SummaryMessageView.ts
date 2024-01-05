import MessageView from "./MessageView.ts";
import Message from "./Message.ts";

export default class SummaryMessageView extends MessageView {

  public constructor(message: Message, messageTarget: EventTarget) {
    super(message, messageTarget)
  }

  update(_: Message): void {
  }

}