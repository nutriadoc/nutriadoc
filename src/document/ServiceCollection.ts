import InlineToolbar from "../ui/toolbar/inline/InlineToolbar.ts";
import Toolbar from "../ui/toolbar/main/Toolbar.ts";
import IFormatter from "../editor/formatter/IFormatter.ts";
import Editor from "../editor/Editor.ts";
import IView from "../ui/IView.ts";
import UploadService from "../ui/upload/service/UploadService.ts";
import S3UploadService from "../ui/upload/S3UploadService.ts";
import {NutriaApiHost} from "../editor/Option.ts";
import DocumentService from "./service/DocumentService.ts";
import DefaultDocumentService from "./service/DefaultDocumentService.ts";
import MockUploadService from "../ui/upload/MockUploadService.ts";
import UserMediaBehavior from "../editor/behavior/upload/UserMediaBehavior.ts";
import DefaultMediaUploadBehavior from "../editor/behavior/upload/DefaultMediaUploadBehavior.ts";
import MessageBox from "../ui/MessageBox/MessageBox.ts";
import MessageBoxMode from "../ui/MessageBox/MessageBoxMode.ts";
import UserBehavior from "../editor/behavior/UserBehavior.ts";
import DefaultUserPressBehavior from "../editor/behavior/DefaultUserPressBehavior.ts";
import Toolbars from "../ui/toolbar/main/Toolbars.ts";

export default class ServiceCollection {

  protected _editor!: Editor

  protected _mediaService: UploadService

  protected _documentService: DocumentService = new DefaultDocumentService()

  protected _mainToolbar: Toolbar

  constructor() {
    this._mediaService = new S3UploadService('https://' + NutriaApiHost)
    this._mainToolbar = Toolbar.simple(this.formatter())
  }

  mediaService(): UploadService {
    return this._mediaService
  }

  mainToolbar(): Toolbar {
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

  mediaUploadBehavior(): UserMediaBehavior {
    const messageBox = new MessageBox(this.mainToolbar(), MessageBoxMode.Tiny)
    return new DefaultMediaUploadBehavior(
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