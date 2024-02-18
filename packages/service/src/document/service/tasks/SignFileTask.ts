import NutriaDocument from "../model/NutriaDocument.ts";
import Attachment from "../model/Attachment.ts";
import AttachmentAssembler from "../assembler/AttachmentAssembler.ts";
import {KeyFile, Task} from "@nutriadoc/classes";

export default class SignFileTask extends Task {

  protected document: NutriaDocument

  protected file: KeyFile

  protected _attachment!: Attachment

  protected apiServer: string

  constructor(apiServer: string, document: NutriaDocument, file: KeyFile) {
    super()
    this.apiServer = apiServer
    this.document = document
    this.file = file
  }

  protected async run(): Promise<void> {

    const data = {
      key: this.file.file.name,
      size: this.file.file.size,
      documentId: this.document.id,
    }

    const response = await fetch(`http://${this.apiServer}/document/file/sign`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })

    
    const json = await response.json()
    const assembler = new AttachmentAssembler()
    this._attachment = assembler.fromDTO(json)

    return Promise.resolve()
  }

  get attachment(): Attachment {
    return this._attachment
  }
}