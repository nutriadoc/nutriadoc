import InlineToolbar from "../ui/toolbar/inline/InlineToolbar.ts";
import Toolbar from "../ui/toolbar/main/Toolbar.ts";
import IFormatter from "../editor/formatter/IFormatter.ts";
import Editor from "../editor/Editor.ts";
import { IView } from "@nutriadoc/classes";
import {ApiUrl, NutriaApiHost} from "../editor/Option.ts";
import MockUploadService from "../ui/upload/MockUploadService.ts";
import UserAttachmentBehavior from "../editor/behavior/upload/UserAttachmentBehavior.ts";
import DefaultUserAttachmentBehavior from "../editor/behavior/upload/DefaultUserAttachmentBehavior.ts";
import MessageBox from "../ui/MessageBox/MessageBox.ts";
import MessageBoxMode from "../ui/MessageBox/MessageBoxMode.ts";
import UserBehavior from "../editor/behavior/UserBehavior.ts";
import DefaultUserPressBehavior from "../editor/behavior/DefaultUserPressBehavior.ts";
import Toolbars from "../ui/toolbar/main/Toolbars.ts";
import Collaboration from "../editor/collaboration/Collaboration.ts";
import Document from "./Document.ts";
import {DocumentService, DefaultDocumentService} from "@nutriadoc/service";

export default class ServiceCollection {

  protected _editor!: Editor

  protected _documentService: DocumentService = new DefaultDocumentService(ApiUrl)

  protected _mainToolbar!: Toolbar


  mainToolbar(): Toolbar {
    if (this._mainToolbar) return this._mainToolbar
    this._mainToolbar = Toolbar.simple(this.formatter())
    return this._mainToolbar
  }

  inlineToolbar(container: IView): InlineToolbar {
    return new InlineToolbar(container, this._editor)
  }

  editor(): Editor {
    throw new Error("Method not implemented.")
  }

  formatter(): IFormatter {
    throw new Error("Method not implemented.")
  }

  documentService(): DocumentService {
    return this._documentService
  }

  collaboration(_: Document): Collaboration {
    throw new Error("Method not implemented.")
  }

  mediaUploadBehavior(): UserAttachmentBehavior {
    const messageBox = new MessageBox(this.mainToolbar(), MessageBoxMode.Tiny)
    return new DefaultUserAttachmentBehavior(
      new MockUploadService(),
      messageBox,
      this.editor()
    )
  }

  userBehavior(toolbars: Toolbars): UserBehavior {
    return new UserBehavior(
      new DefaultUserPressBehavior(toolbars),
      this.mediaUploadBehavior()
    )
  }
}