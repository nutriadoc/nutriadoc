import KeyFile from "../../core/file/KeyFile"
import Format from "../formatter/Format"
import AttachmentCommand from "./AttachmentCommand"
import ImageCommand from "./ImageCommand"
import VideoCommand from "./VideoCommand"
import DocumentCommandType from "../../document/commands/DocumentCommandType.ts";

export default class AttachmentFactory {
  create(
    source: KeyFile,
    type: DocumentCommandType,
    width?: number,
    height?: number
  ): AttachmentCommand {
    const formatType = type == DocumentCommandType.SelectImage ?
      Format.Image : type == DocumentCommandType.SelectVideo?
      Format.Video : DocumentCommandType.SelectAttachment

    const cls: any = formatType == Format.Image ?
      ImageCommand : formatType == Format.Video ?
      VideoCommand : AttachmentCommand

    return new cls(
      source,
      formatType,
      width,
      height
    )
  }
}