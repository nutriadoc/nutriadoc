import Task from "../../../ui/task/Task.ts";
import SignFileTask from "./SignFileTask.ts";
import { KeyFile } from "@/core"
import mime from "mime"
import axios from "axios";

export default class UploadFileTask extends Task {

  protected file: KeyFile

  constructor(file: KeyFile) {
    super();
    this.file = file
  }

  protected async run(): Promise<void> {
    if (!this._parent) return
    const parent = this._parent

    const sign = parent.find<SignFileTask>("SignFileTask")
    const type = mime.getType(this.file.file.type)!
    const instance = axios.create()

    await instance.put(sign!.attachment.url.write, this.file.file, {
      headers: {
        "Content-Type": type,
      },
      onUploadProgress: (progressEvent) => {
        this.progress(progressEvent.loaded, progressEvent.total ?? 0)
      }
    })

    return Promise.resolve()
  }
}