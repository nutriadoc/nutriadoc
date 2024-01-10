import Task from "../../task/Task.ts";

export default interface IFileHttp {
  upload(filename: string, mimeType: string): Task
}