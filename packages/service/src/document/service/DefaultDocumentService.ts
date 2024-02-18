import DocumentService from "./DocumentService.ts"
import NutriaDocument from "./model/NutriaDocument.ts"
import User from "./model/User.ts"
import LocalStorageUserRepository from "./repository/LocalStorageUserRepository.ts"
import CreateAttachmentTask from "./tasks/CreateAttachmentTask.ts"
import NutriaDocumentAssembler from "./assembler/NutriaDocumentAssembler.ts"
import {KeyFile} from "@nutriadoc/classes"
import {CreateDocumentCommand, ChangeDocumentCommand, Attachment} from "./index.ts"
import DocumentListItem from "./model/DocumentListItem.ts"
import Pagination from "./model/Pagination.ts"
import BaseService from "../../service/BaseService.ts"
import AttachmentAssembler from "./assembler/AttachmentAssembler.ts";

export default class DefaultDocumentService extends BaseService implements DocumentService {

  protected userRepository: LocalStorageUserRepository = new LocalStorageUserRepository()


  async createDocument(cmd: CreateDocumentCommand): Promise<NutriaDocument> {
    const response = await this.axios.post("/document", cmd)
    const assembler = new NutriaDocumentAssembler()
    return assembler.fromDTO("", response.data)
  }
  async changeDocument(cmd: ChangeDocumentCommand): Promise<NutriaDocument> {
    const response = await this.axios.put(`/document`, cmd)
    const assembler = new NutriaDocumentAssembler()
    return assembler.fromDTO(cmd.id, response.data)
  }

  async findDocument(id: string): Promise<NutriaDocument> {
    const response = await this.axios.get(`/document/${id}`)
    const json = response.data
    const assembler = new NutriaDocumentAssembler()
    return assembler.fromDTO(id, json)
  }

  async findDocuments(page: number, _pageSize?: number): Promise<Pagination<DocumentListItem>> {
    const response = await this.axios.get("/document/" + page)
    const assembler = new NutriaDocumentAssembler()
    return assembler.toListItem(response.data)
  }

  async findOrCreateDocument(key?: string, workspace?: string): Promise<NutriaDocument> {
    
    const response = await this.axios.post("/document", {
      workspace,
      key,
    })

    const json = response.data
    const assembler = new NutriaDocumentAssembler()
    return assembler.fromDTO(key ?? "", json)
  }

  createAttachment(document: NutriaDocument, file: KeyFile): CreateAttachmentTask {
    return new CreateAttachmentTask(this, document, file)
  }

  async createObjectCredential(document: NutriaDocument, file: KeyFile): Promise<Attachment> {
    const data = {
      key: file.file.name,
      size: file.file.size,
      documentId: document.id,
    }

    const response = await this.axios.post(`/document/file/sign`, data)

    const assembler = new AttachmentAssembler()
    return assembler.fromDTO(response.data)
  }

  getUser(): Promise<User> {
    return this.userRepository.getUser()
  }
}