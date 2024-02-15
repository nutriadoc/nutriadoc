import {a, className, div, href, id, table, tbody, td, text, th, thead, tr} from "@nutriadoc/classes";
import {push, route, RouteView} from "@nutriadoc/components";
import ConsoleService from "../../service/ConsoleService.ts";

@route("/console/documents")
export default class DocumentList extends RouteView {

  protected service: ConsoleService = new ConsoleService()

  constructor() {
    super()
  }

  render(): Node | Node[] {
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

    return super.render();
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