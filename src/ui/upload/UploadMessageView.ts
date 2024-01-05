import MessageView from "../MessageBox/MessageView.ts";
import Message from "../MessageBox/Message.ts";

export default class UploadMessageView extends MessageView {

  constructor(messageTarget: EventTarget) {
    super(new Message(), messageTarget)
  }

  update(_: Message): void {
    throw new Error("Method not implemented.");
  }

  remove() {

  }
}