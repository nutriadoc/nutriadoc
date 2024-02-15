import {className, id, table, tbody, td, text, th, thead, tr, View} from "@nutriadoc/classes";
import {route} from "@nutriadoc/components";
import ConsoleService from "../../service/ConsoleService.ts";

@route("/console/documents")
export default class DocumentList extends View {

  protected service: ConsoleService = new ConsoleService()

  constructor() {
    super(
      undefined,
      text("Document list"),
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
  }

  async renderList() {
    const documents = await this.service.fetchDocuments()
    const views = documents.map(document => {
      return tr(
        td(text(document.id)),
        td(text(document.title)),
        td(text(document.createdAt)),
        td(text(document.updatedAt)),
      )
    })

    this.documentListBody.removeAllChild()
    this.documentListBody.add(views)
  }

  get documentListBody() {
    return this.find(id("document-list"))!.find(id("document-list-body"))!
  }
}