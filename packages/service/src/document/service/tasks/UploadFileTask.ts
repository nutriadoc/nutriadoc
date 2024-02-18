import axios from "axios"
import {KeyFile, Mime, Task} from "@nutriadoc/classes"
import SignFileTask from "./SignFileTask.ts";

export default class UploadFileTask extends Task {

  protected file: KeyFile

  constructor(file: KeyFile) {
    super();
    this.file = file
  }

  protected async run(): Promise<void> {
    const sign: SignFileTask = this.parent.children[0]
    const type = Mime.shared.getType(this.file.file.type)
    const instance = axios.create()

    const credential = sign.attachment.credentials.write!

    const form = new FormData()

    form.append("key", credential.key)
    form.append("policy", credential.policy)
    form.append("Signature", credential.signature)
    form.append("OSSAccessKeyId", credential.accessKey)
    form.append("x-oss-object-acl", "public-read")
    form.append("file", this.file.file)


    await instance.postForm(credential.endpoint, form, {
      onUploadProgress: (progressEvent) => {
        this.progress(progressEvent.loaded, progressEvent.total ?? 0)
      }
    })

    return Promise.resolve()
  }
}