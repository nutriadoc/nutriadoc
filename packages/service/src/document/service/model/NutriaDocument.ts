import Attachment from "./Attachment"

export default class NutriaDocument {

  id: string

  createdAt: Date

  attachments: Attachment[] = []

  deltas: any[] = []

  constructor(id: string, createdAt: Date) {
    this.id = id
    this.createdAt = createdAt
  }

  addAttachment(attachment: Attachment) {
    this.attachments.push(attachment)
  }
}