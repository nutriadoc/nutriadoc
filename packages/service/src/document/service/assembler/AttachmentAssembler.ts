import Attachment from "../model/Attachment";
import ImageAttachment from "../model/ImageAttachment";
import VideoAttachment from "../model/VideoAttachment";
import CreateObjectCredential from "../model/CreateObjectCredential.ts";

export default class AttachmentAssembler {
  
  fromDTO(dto: any): Attachment {
    const [type] = dto.type.split("/")

    let attachment: Attachment

    let attachmentClass: any

    switch(type) {
      case "image":
        attachmentClass = ImageAttachment
        break;
      case "video":
        attachmentClass = VideoAttachment
        break;
      default:
        attachmentClass = Attachment
        break;
    }

    attachment = new attachmentClass(
      dto.id,
      dto.key,
      dto.size,
      dto.type,
      new Date(dto.createdAt),
      dto.readUrl as string,
      dto.createObjectCredential as CreateObjectCredential
    )

    return attachment
  }
}