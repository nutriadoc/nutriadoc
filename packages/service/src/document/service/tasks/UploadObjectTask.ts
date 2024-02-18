import axios from "axios"
import {KeyFile, Task} from "@nutriadoc/classes"
import CreateObjectCredentialTask from "./CreateObjectCredentialTask.ts";

export default class UploadObjectTask extends Task {

  protected file: KeyFile

  constructor(file: KeyFile) {
    super();
    this.file = file
  }

  protected async run(): Promise<void> {
    const credentialTask = this.parent!.children[0] as CreateObjectCredentialTask

    const instance = axios.create()

    const credential = credentialTask.attachment.createObjectCredential

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