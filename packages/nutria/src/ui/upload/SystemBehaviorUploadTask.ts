import Task from "../task/Task.ts";

export default class SystemBehaviorUploadTask extends Task {

  restoreUploadTasks(): Promise<void> {
    throw new Error("Method not implemented.");
  }
}