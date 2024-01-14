import Task from "../../ui/task/Task.ts";
import Option from "../../editor/Option.ts";
import DocumentService from "../service/DocumentService.ts";
import ITask from "../../ui/task/ITask.ts";
import DocumentLoadTask from "./DocumentLoadTask.ts";
import EditorLoadContentTask from "./EditorLoadContentTask.ts";
import Editor from "../../editor/Editor.ts";
import Document from "../Document.ts";

export default class ContentLoaderTask extends Task {

  protected document: Document

  public constructor(
    option: Option | undefined,
    editor: Editor,
    doc: Document,
    service: DocumentService,
    collaboration: ITask) {

    super([
      new DocumentLoadTask(service, option),
      collaboration,
      new EditorLoadContentTask(editor, doc, option)
    ])

    this.document = doc
  }

  onSuccess() {

  }
}