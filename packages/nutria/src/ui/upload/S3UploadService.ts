import UploadService from "./service/UploadService.ts"
import { Optional } from "@nutriadoc/classes"
import Task from "../task/Task.ts"
import { KeyFile } from "@/core"

export default class S3UploadService implements UploadService {

  protected _endpoint: string

  constructor(endpoint: string) {
    this._endpoint = endpoint
  }

  get(_key: string): Optional<Task> {
    return Optional.empty();
  }

  upload(_file: KeyFile): Task {
    return new Task();
  }

}