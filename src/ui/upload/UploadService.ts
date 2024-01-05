import Task from "../task/Task.ts";
import Optional from "../../core/util/Optional.ts";

export default interface UploadService {

  get(key: string): Optional<Task>

  upload(file: File, id?: string): Task

}