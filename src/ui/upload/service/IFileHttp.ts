import Task from "../../task/Task.ts";

export default interface IFileHttp {
  upload(file: File, mimeType: string): Task
}