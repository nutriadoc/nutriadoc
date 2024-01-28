import Task from "../../task/Task.ts";
import { Optional, KeyFile } from "@nutriadoc/classes"

export default interface UploadService {

  get(key: string): Optional<Task>

  upload(file: KeyFile): Task

}