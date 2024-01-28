import Task from "../../../ui/task/Task.ts";
import NutriaDocument from "../model/NutriaDocument.ts";
import { KeyFile} from "../../core"
import {NutriaApiHost} from "../../../editor/Option.ts";
import Attachment from "../model/Attachment.ts";
import attachmentAssembler from "../assembler/AttachmentAssembler.ts";

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
    const assembler = new attachmentAssembler()
    this._attachment = assembler.fromDTO(json)

    return Promise.resolve()
  }

  get attachment(): Attachment {
    return this._attachment
  }
}