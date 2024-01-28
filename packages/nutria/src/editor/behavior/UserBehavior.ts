import UserPressBehavior from "./UserPressBehavior.ts";
import UserAttachmentBehavior from "./upload/UserAttachmentBehavior.ts";
import DocumentCommand from "../../document/commands/DocumentCommand.ts";
import DocumentCommandType from "../../document/commands/DocumentCommandType.ts";
import TypingCommand from "../../document/commands/TypingCommand.ts";

export default class UserBehavior {

  protected press: UserPressBehavior

  protected _upload: UserAttachmentBehavior

  constructor(press: UserPressBehavior, upload: UserAttachmentBehavior) {
    this.press = press
    this._upload = upload
  }

  execute(cmd: DocumentCommand) {
    switch (cmd.type) {
      case DocumentCommandType.Undo: {
        this.press.clickUndo()
        break
      }
      case DocumentCommandType.Typing: {
        let command = cmd as TypingCommand
        this.press.typing(command.mutation, command.old)
        break
      }
      case DocumentCommandType.SelectVideo:
      case DocumentCommandType.SelectAttachment:
      case DocumentCommandType.SelectImage: {
        this._upload.selectFile(cmd.type)
        break
      }

    }
  }

  public get upload(): UserAttachmentBehavior {
    return this._upload
  }
}