import NutriaDocument from "./model/NutriaDocument.ts";
import User from "./model/User.ts";
import CreateAttachmentTask from "./tasks/CreateAttachmentTask.ts";
import {KeyFile} from "@nutriadoc/classes";
import {ChangeDocumentCommand, CreateDocumentCommand} from "./commands";
import Pagination from "./model/Pagination.ts";
import DocumentListItem from "./model/DocumentListItem.ts";
import {Attachment} from "./model";

export default interface DocumentService {

  findDocuments(page: number, _pageSize?: number): Promise<Pagination<DocumentListItem>>

  findDocument(id: string): Promise<NutriaDocument>

  findOrCreateDocument(key?: string, workspace?: string): Promise<NutriaDocument>

  createObjectCredential(document: NutriaDocument, file: KeyFile): Promise<Attachment>

  createDocument(cmd: CreateDocumentCommand): Promise<NutriaDocument>

  changeDocument(cmd: ChangeDocumentCommand): Promise<NutriaDocument>

  createAttachment(document: NutriaDocument, file: KeyFile): CreateAttachmentTask

  getUser(): Promise<User>
}