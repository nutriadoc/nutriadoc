import Message from "./Message.ts";

export default class MessageEvent extends Event {

  protected _message: Message

  public constructor(type: string, message: Message) {
    super(type)
    this._message = message
  }

  public get message(): Message {
    return this._message
  }
}