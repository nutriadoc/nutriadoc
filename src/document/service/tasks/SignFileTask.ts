import Task from "../../../ui/task/Task.ts";
import NutriaDocument from "../model/NutriaDocument.ts";
import KeyFile from "../../../core/file/KeyFile.ts";
import {NutriaApiHost} from "../../../editor/Option.ts";

export default class SignFileTask extends Task {

  protected document: NutriaDocument

  protected file: KeyFile

  public url?: string

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

    const response = await fetch(`https://${baseUrl}/file/sign`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
    const json = await response.json()
    this.url = json.url

    return Promise.resolve()
  }
}