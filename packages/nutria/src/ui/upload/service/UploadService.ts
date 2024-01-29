import Task from "../../task/Task.ts";
import { Optional } from "@nutriadoc/classes"
import { KeyFile } from "@/core"

export default interface UploadService {

  get(key: string): Optional<Task>

  upload(file: KeyFile): Task

}