import NutriaDocument from "./model/NutriaDocument.ts";
import User from "./model/User.ts";
import CreateMediaTask from "./tasks/CreateMediaTask.ts";
import {KeyFile} from "@nutriadoc/classes";
import {ChangeDocumentCommand, CreateDocumentCommand} from "./commands";
import Pagination from "./model/Pagination.ts";
import DocumentListItem from "./model/DocumentListItem.ts";

export default interface DocumentService {

  findDocuments(page: number, _pageSize?: number): Promise<Pagination<DocumentListItem>>

  findDocument(id: string): Promise<NutriaDocument>

  findOrCreateDocument(key?: string, workspace?: string): Promise<NutriaDocument>

  createDocument(cmd: CreateDocumentCommand): Promise<NutriaDocument>

  changeDocument(cmd: ChangeDocumentCommand): Promise<NutriaDocument>

  createMedia(document: NutriaDocument, file: KeyFile): CreateMediaTask

  getUser(): Promise<User>
}