import NutriaDocument from "./model/NutriaDocument.ts";
import User from "./model/User.ts";
import CreateMediaTask from "./tasks/CreateMediaTask.ts";
import {KeyFile} from "@nutriadoc/classes";

export default interface DocumentService {

  findDocument(id: string): Promise<NutriaDocument>

  findOrCreateDocument(key?: string, workspace?: string): Promise<NutriaDocument>

  createMedia(document: NutriaDocument, file: KeyFile): CreateMediaTask

  getUser(): Promise<User>
}