import Task from "../../ui/task/Task.ts";
import Option from "../../editor/Option.ts";
import ITask from "../../ui/task/ITask.ts";
import DocumentLoadTask from "./DocumentLoadTask.ts";
import EditorLoadContentTask from "./EditorLoadContentTask.ts";
import Editor from "../../editor/Editor.ts";
import Document from "../Document.ts";
import {DocumentService} from "@nutriadoc/service";

export default class ContentLoaderTask extends Task {

  protected document: Document

  public constructor(
    option: Option,
    editor: Editor,
    doc: Document,
    service: DocumentService,
    collaboration: ITask) {

    const enableCollaboration = !!option.documentId || !!option.key
    let tasks: Task[] = []
    if (enableCollaboration) {
      tasks = [
        new DocumentLoadTask(doc, service, option),
        collaboration as Task,
        new EditorLoadContentTask(editor, doc, option)
      ]
    } else {
      tasks = [new EditorLoadContentTask(editor, doc, option)]
    }

    super(tasks)

    this.document = doc
  }

  onSuccess() {

  }
}