import NutriaDocument from "./model/NutriaDocument.ts";
import User from "./model/User.ts";
import KeyFile from "../../core/file/KeyFile.ts";
import CreateMediaTask from "./tasks/CreateMediaTask.ts";

export default interface DocumentService {

  findOrCreateDocument(key?: string, workspace?: string): Promise<NutriaDocument>

  createMedia(document: NutriaDocument, file: KeyFile): CreateMediaTask

  getUser(): Promise<User>
}