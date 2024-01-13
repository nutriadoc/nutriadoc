import Task from "../../ui/task/Task.ts";
import DocumentService from "../service/DocumentService.ts";
import Option from "../../editor/Option.ts";
import NutriaDocument from "../service/model/NutriaDocument.ts";

export default class DocumentLoadTask extends Task {

  protected service: DocumentService

  protected option?: Option

  protected _document?: NutriaDocument

  public constructor(service: DocumentService, option?: Option) {
    super()

    this.service = service
    this.option = option
  }

  protected async run(): Promise<void> {
    this._document = await this.service.findOrCreateDocument(this.option?.key, this.option?.workspace)
  }

  get document(): NutriaDocument | undefined {
    return this._document
  }
}