import NutriaDocument from "../model/NutriaDocument.ts";
import Attachment from "../model/Attachment.ts";
import {KeyFile, Task} from "@nutriadoc/classes";
import {DocumentService} from "../index.ts";

export default class CreateObjectCredentialTask extends Task {

  protected document: NutriaDocument

  protected file: KeyFile

  protected _attachment!: Attachment

  protected documentService: DocumentService

  constructor(documentService: DocumentService, document: NutriaDocument, file: KeyFile) {
    super()
    this.documentService = documentService
    this.document = document
    this.file = file
  }

  protected async run(): Promise<void> {
    this._attachment = await this.documentService.createObjectCredential(this.document, this.file)
    return Promise.resolve()
  }

  get attachment(): Attachment {
    return this._attachment
  }
}