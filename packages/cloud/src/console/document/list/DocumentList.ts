import {a, className, div, href, id, table, tbody, td, text, th, thead, tr} from "@nutriadoc/classes";
import {push, route, RouteView} from "@nutriadoc/components";
import {DefaultDocumentService} from "@nutriadoc/service";
import {ApiServer} from "../../../config/Server.ts";

@route("/console/documents")
export default class DocumentList extends RouteView {

  protected service = new DefaultDocumentService(ApiServer)

  protected page: number = 1

  constructor() {
    super()
  }

  render(): Node | Node[] {
    if (this._rendered) {
      this.renderList()
      return this.element as Node
    }
    this._rendered = true

    this.assignUnits(
      div(
        text("Document list"),
        a(
          push("/console/document/new", this),
          href("/console/document/new"),
          text("New document")
        )
      ),
      table(
        id("document-list"),
        className("document-list"),
        thead(
          tr(
            th(text("ID")),
            th(text("Title")),
            th(text("Created At")),
            th(text("Updated At")),
          )
        ),
        tbody(
          id("document-list-body")
        )
      )
    )

    this.renderList().then(() => {})

    return this.element as Node
  }

  async renderList() {
    const documents = await this.service.findDocuments(this.page)

    const views = documents.data.map(document => {
      return tr(
        td(
          a(
            text(document.id),
            href(`/console/document/edit/${document.id}`),
            push(`/console/document/edit/${document.id}`, this)
          )
        ),
        td(
          a(
            text(document.title || "Untitled"),
            href(`/console/document/edit/${document.id}`),
            push(`/console/document/edit/${document.id}`, this)
          )
        ),
        td(text(document.createdAt.toString())),
        td(text(document.updatedAt.toString())),
      )
    })

    this.documentListBody.removeAllChild()
    this.documentListBody.add(views)
  }

  get documentListBody() {
    return this.find(id("document-list"))!.find(id("document-list-body"))!
  }
}