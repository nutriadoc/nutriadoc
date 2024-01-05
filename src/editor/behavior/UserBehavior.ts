import UserPressBehavior from "./UserPressBehavior.ts";
import UserUploadBehavior from "./upload/UserUploadBehavior.ts";
import DocumentCommand from "../../document/commands/DocumentCommand.ts";
import DocumentCommandType from "../../document/commands/DocumentCommandType.ts";
import TypingCommand from "../../document/commands/TypingCommand.ts";

export default class UserBehavior {

  protected press: UserPressBehavior

  protected upload: UserUploadBehavior

  constructor(press: UserPressBehavior, upload: UserUploadBehavior) {
    this.press = press
    this.upload = upload
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
        this.upload.selectImageFile()
        break
      }
    }
  }
}