import NutriaDocument from "../model/NutriaDocument"
import AttachmentAssembler from "./AttachmentAssembler"
import {DocumentNotFoundException} from "@/document";

export default class NutriaDocumentAssembler {

  protected attachmentAssembler: AttachmentAssembler = new AttachmentAssembler()

  fromDTO(id: string, dto: any) {
    if ('message' in dto) throw new DocumentNotFoundException(id)

    const document = new NutriaDocument(dto.id, new Date(dto.createdAt))
    dto.attachments?.forEach((attachment: any) => {
      document.addAttachment(this.attachmentAssembler.fromDTO(attachment))
    })
    return document
  }
}