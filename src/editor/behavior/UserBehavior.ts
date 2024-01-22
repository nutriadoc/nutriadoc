import UserPressBehavior from "./UserPressBehavior.ts";
import UserMediaBehavior from "./upload/UserMediaBehavior.ts";
import DocumentCommand from "../../document/commands/DocumentCommand.ts";
import DocumentCommandType from "../../document/commands/DocumentCommandType.ts";
import TypingCommand from "../../document/commands/TypingCommand.ts";

export default class UserBehavior {

  protected press: UserPressBehavior

  protected _upload: UserMediaBehavior

  constructor(press: UserPressBehavior, upload: UserMediaBehavior) {
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
      case DocumentCommandType.SelectImage: {
        this._upload.selectImageFile()
        break
      }
    }
  }

  public get upload(): UserMediaBehavior {
    return this._upload
  }
}