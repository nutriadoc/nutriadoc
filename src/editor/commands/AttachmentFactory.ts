import KeyFile from "../../core/file/KeyFile"
import Format from "../formatter/Format"
import AttachmentCommand from "./AttachmentCommand"
import ImageCommand from "./ImageCommand"
import VideoCommand from "./VideoCommand"

export default class AttachmentFactory {
  create(
    source: KeyFile,
    width?: number,
    height?: number
  ): AttachmentCommand {
    const type = source.type == 'image' ?
      Format.Image : source.type == 'video' ?
      Format.Video : Format.Attachment

    const cls: any = type == Format.Image ?
      ImageCommand : type == Format.Video ?
      VideoCommand : AttachmentCommand

    return new cls(
      source,
      type,
      width,
      height
    )
  }
}