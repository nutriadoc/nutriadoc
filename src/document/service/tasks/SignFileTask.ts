import Task from "../../../ui/task/Task.ts";
import NutriaDocument from "../model/NutriaDocument.ts";
import KeyFile from "../../../core/file/KeyFile.ts";
import {NutriaApiHost} from "../../../editor/Option.ts";
import SignaturedUrl from "../model/SignaturedUrl.ts";
import Attachment from "../model/Attachment.ts";
import ImageAttachment from "../model/ImageAttachment.ts";
import VideoAttachment from "../model/VideoAttachment.ts";

export default class SignFileTask extends Task {

  protected document: NutriaDocument

  protected file: KeyFile

  protected _attachment!: Attachment

  constructor(document: NutriaDocument, file: KeyFile) {
    super()
    this.document = document
    this.file = file
  }

  protected async run(): Promise<void> {

    const baseUrl = NutriaApiHost
    const data = {
      key: this.file.file.name,
      size: this.file.file.size,
      documentId: this.document.id,
    }

    const response = await fetch(`https://${baseUrl}/document/file/sign`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
    
    const json = await response.json()
    
    const [type] = json.type.split("/")
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
      json.id,
      json.key,
      json.size,
      json.type,
      new Date(json.createdAt),
      json.url as SignaturedUrl,
    )

    this._attachment = attachment

    return Promise.resolve()
  }

  get attachment(): Attachment {
    return this._attachment
  }
}