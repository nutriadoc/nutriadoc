import InlineToolbar from "../ui/toolbar/inline/InlineToolbar.ts";
import Toolbar from "../ui/toolbar/main/Toolbar.ts";
import IFormatter from "../editor/formatter/IFormatter.ts";
import Editor from "../editor/Editor.ts";
import IView from "../ui/IView.ts";
import UploadService from "../ui/upload/service/UploadService.ts";
import S3UploadService from "../ui/upload/S3UploadService.ts";
import {NutriaApiHost} from "../editor/Option.ts";

export default class ServiceCollection {

  protected _editor!: Editor

  protected _mediaService: UploadService

  constructor() {
    this._mediaService = new S3UploadService('https://' + NutriaApiHost)
  }

  mediaService(): UploadService {
    return this._mediaService
  }

  mainToolbar(): Toolbar {
    return Toolbar.simple(this.formatter())
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
}