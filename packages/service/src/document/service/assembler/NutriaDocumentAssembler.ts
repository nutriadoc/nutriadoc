import AttachmentAssembler from "./AttachmentAssembler"
import {DocumentNotFoundException} from "../model";
import NutriaDocument from "../model/NutriaDocument.ts";
import Pagination from "../model/Pagination.ts";

export default class NutriaDocumentAssembler {

  protected attachmentAssembler: AttachmentAssembler = new AttachmentAssembler()

  fromDTO(id: string, dto: any) {
    if ('message' in dto) throw new DocumentNotFoundException(id)

    const document = new NutriaDocument(
      dto.id,
      dto.key,
      dto.title,

      new Date(dto.createdAt),
      new Date(dto.updatedAt)
    )

    dto.attachments?.forEach((attachment: any) => {
      document.addAttachment(this.attachmentAssembler.fromDTO(attachment))
    })
    return document
  }

  toListItem(data: Pagination<any>) {
    return {
      ...data,
      data: data.data.map(item => ({
        id: item.id,
        key: item.key,
        title: item.title,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt
      }))
    }
  }
}