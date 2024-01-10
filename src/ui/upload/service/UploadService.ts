import Task from "../../task/Task.ts";
import Optional from "../../../core/util/Optional.ts";
import KeyFile from "../../../core/file/KeyFile.ts";

export default interface UploadService {

  get(key: string): Optional<Task>

  upload(file: KeyFile): Task

}