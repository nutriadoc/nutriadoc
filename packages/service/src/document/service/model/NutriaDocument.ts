import Attachment from "./Attachment"

export default class NutriaDocument {

  id: string

  key?: string

  title?: string

  createdAt: Date

  updatedAt: Date

  attachments: Attachment[] = []

  deltas: any[] = []

  constructor(id: string, key: string | undefined, title: string | undefined, createdAt: Date, updatedAt: Date) {
    this.id = id
    this.key = key
    this.title = title
    this.createdAt = createdAt
    this.updatedAt = updatedAt
  }

  addAttachment(attachment: Attachment) {
    this.attachments.push(attachment)
  }
}