import Option from "../../editor/Option.ts";
import Document from "../Document.ts";
import {IndexeddbPersistence} from "y-indexeddb";
import {Task} from "@nutriadoc/classes";
import {DocumentService, NutriaDocument} from "@nutriadoc/service";

export default class DocumentLoadTask extends Task {

  protected service: DocumentService

  protected option: Option

  protected _data?: NutriaDocument

  protected document: Document

  public constructor(doc: Document, service: DocumentService, option: Option) {
    super()

    this.document = doc
    this.service = service
    this.option = option
  }

  protected async run(): Promise<void> {
    if (!!this.option.documentId)
      this._data = await this.service.findDocument(this.option.documentId)
    else
      this._data = await this.service.findOrCreateDocument(this.option.key)

    this.document.data = this._data

    // TODO: The indexeddb persistence a full database of yjs, but we only need one document.
    new IndexeddbPersistence(
       // 'offline',
       this._data!.id,
       this.document.ydoc
     )
  }

  get data(): NutriaDocument | undefined {
    return this._data
  }
}