import {back, Input, route, RouteView} from "@nutriadoc/components"
import {_for, a, className, div, href, id, label, name, on, placeholder, text } from "@nutriadoc/classes"
// @ts-ignore
import { create, DocumentMutationEvent, Document } from "nutria"
import {DefaultDocumentService, DocumentService, NutriaDocument} from "@nutriadoc/service"
import {ApiServer} from "../../../config/Server.ts"

import "@nutriadoc/classes/dist/style.css"
import "../../index.scss"

interface DocumentState {
  id: string

  title: string

  key: string

  delta?: any

  document?: NutriaDocument
}

@route("/console/document/new")
@route("/console/document/edit/:id")
export default class DocumentEdit extends RouteView {

  state: DocumentState

  nutria: Document

  parameters: any = {} as any

  protected titleChangeHandler = this.onTitleChange.bind(this)

  protected titleBlurHandler = this.onTitleBlur.bind(this)

  protected keyChangeHandler = this.onKeyChange.bind(this)

  protected keyBlurHandler = this.onKeyBlur.bind(this)

  protected documentService: DocumentService = new DefaultDocumentService(ApiServer)

  protected documentCreating: boolean = false

  constructor() {
    super()

    this.state = {
      id: "",
      title: "",
      key: "",
      document: undefined,
    }
  }

  render(): Node | Node[] {

    this.state.id = this.parameters.get("id")

    this.removeAllChild()

    this.nutria = create(
      undefined,
      {
        documentId: this.state.id,
        textChange: this.onTextChange.bind(this)
      }
    )

    this.assignUnits(
      className("flex", "flex-col", "flex-1"),
      a(href("#"), text("back"), back(this)),
      div(text("New document")),
      div(
        id("fields"),
        className("flex", "flex-1", "flex-col"),
        div(
          id("title-field"),
          className("flex", "flex-col"),
          label(_for("title"), text("Title")),
          new Input(
            id("title"),
            name("title"),
            className("input", "flex"),
            placeholder("Please enter the title"),
            on("change", this.titleChangeHandler),
            on("blur", this.titleBlurHandler)
          )
        ),
        div(
          id("key-field"),
          className("flex", "flex-col"),
          label(_for("key"), text("Key")),
          new Input(
            id("key"),
            name("key"),
            className("input", "flex"),
            placeholder("Please enter the key"),
            on("change", this.keyChangeHandler),
            on("blur", this.keyBlurHandler),
          )
        ),
        div(
          id("content-field"),
          this.nutria
        )
      )
    )

    if (!!this.state.id) {
      this.documentService.findDocument(this.state.id).then(document => {
        this.state.key = document.key || ''
        this.state.title = document.title || ''

        this.keyField.setAttribute("value", document.key || '')
        this.titleField.setAttribute("value", document.title || '')
      })
    }

    return super.render();
  }

  async onTitleChange() {
    this.state.title = this.titleField.value
    await this.onModelChanged()
  }

  onTitleBlur(_: Event) {
  }

  async onKeyChange() {
    this.state.key = this.keyField.value
    await this.onModelChanged()
  }

  onKeyBlur(_: Event) {
  }

  async onTextChange(event: DocumentMutationEvent) {
    const { mutation } = event
    this.state.delta = mutation.delta

    console.debug('on text change', {mutation, state: this.state})
  }

  async onModelChanged() {
    const isKeyEmpty = !this.state.key
    const isTitleEmpty = !this.state.title
    const isIdEmpty = !this.state.id

    if (isKeyEmpty && isTitleEmpty) {
      return
    }

    this.createOrUpdateDocument(isIdEmpty)
  }

  async createOrUpdateDocument(isIdEmpty: boolean) {
    if (isIdEmpty) {
      await this.createDocument()
    } else {
      await this.updateDocument()
    }
  }

  async createDocument() {
    if (this.documentCreating) return

    console.debug("create document", this.state)

    this.documentCreating = true
    this.state.document = await this.documentService.createDocument({
      key: this.state.key,
      title: this.state.title,
    })

    // this.nutria.setDocument(this.state.document)
    this.state.id = this.state.document.id
    this.documentCreating = false
  }

  async updateDocument() {
    this.state.document = await this.documentService.changeDocument({
      id: this.state.id,
      key: this.state.key,
      title: this.state.title,
    })

    this.state.id = this.state.document.id
  }

  get isIdEmpty(): boolean {
    return !this.state.id
  }

  get fields() {
    return this.find(id("fields"))!
  }

  get keyField() {
    return this.fields.find(id("key-field"))!.find(id("key"))!.element as HTMLInputElement
  }

  get titleField() {
    return this.fields.find(id("title-field"))!.find(id("title"))!.element as HTMLInputElement
  }
}