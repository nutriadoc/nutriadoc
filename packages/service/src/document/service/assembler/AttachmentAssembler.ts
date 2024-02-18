import Attachment from "../model/Attachment";
import ImageAttachment from "../model/ImageAttachment";
import SignaturedUrl from "../model/SignaturedUrl";
import VideoAttachment from "../model/VideoAttachment";
import Credentials from "../model/Credentials.ts";

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
      dto.url as SignaturedUrl,
      dto.credentials as Credentials
    )

    return attachment
  }
}