import { KeyFile } from "@nutriadoc/classes"
import Format from "../../formatter/Format"
import AbstractAttachmentCommand from "./AbstractAttachmentCommand.ts"
import ImageCommand from "./ImageCommand"
import VideoCommand from "./VideoCommand"
import DocumentCommandType from "../../../document/commands/DocumentCommandType.ts";
import AttachmentCommand from "./AttachmentCommand.ts";

export default class AttachmentFactory {
  create(
    source: KeyFile,
    type?: DocumentCommandType,
    width?: number,
    height?: number
  ): AbstractAttachmentCommand {

    if (type === undefined) {
      type = source.type === 'image' ? DocumentCommandType.SelectImage :
        source.type === 'video' ? DocumentCommandType.SelectVideo :
        DocumentCommandType.SelectAttachment
    }

    const formatType = type == DocumentCommandType.SelectImage ?
      Format.Image : type == DocumentCommandType.SelectVideo ?
      Format.Video : Format.Attachment

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