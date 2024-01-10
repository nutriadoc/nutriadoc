import IFileHttp from "./IFileHttp.ts";
import Task from "../../task/Task.ts";
import UploadTask from "../UploadTask.ts";

export default class FileHttp implements IFileHttp {

  protected readonly endpoint: string = "https://i.nutria-doc.com/file"

  upload(file: File, mimeType: string): Task {
    return new UploadTask(file, mimeType, this.endpoint)
  }

  protected async sign(filename: string, mimeType: string): Promise<string> {
    const response = await fetch(`${this.endpoint}/file/sign`, {
      body: JSON.stringify({
        filename,
        mimeType,
      }),
      method: "POST",
    })
    const json = await response.json()
    return json.url
  }

}
