import NutriaDocument from "../model/NutriaDocument"
import AttachmentAssembler from "./AttachmentAssembler"

export default class NutriaDocumentAssembler {

  protected attachmentAssembler: AttachmentAssembler = new AttachmentAssembler()

  fromDTO(dto: any) {
    const document = new NutriaDocument(dto.id, new Date(dto.createdAt))
    dto.attachments?.forEach((attachment: any) => {
      document.addAttachment(this.attachmentAssembler.fromDTO(attachment))
    })
    return document
  }
}