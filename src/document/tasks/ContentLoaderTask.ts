import Task from "../../ui/task/Task.ts";
import Option from "../../editor/Option.ts";
import DocumentService from "../service/DocumentService.ts";
import ITask from "../../ui/task/ITask.ts";
import DocumentLoadTask from "./DocumentLoadTask.ts";

export default class ContentLoaderTask extends Task {

  public constructor(option: Option | undefined, service: DocumentService, collaboration: ITask) {
    super([
      new DocumentLoadTask(service, option),
      collaboration,
      Task.new(() => this.editorLoadContent.bind(this))
    ]);
  }

  protected async editorLoadContent() {
    debugger
    return Promise.resolve()
  }
}