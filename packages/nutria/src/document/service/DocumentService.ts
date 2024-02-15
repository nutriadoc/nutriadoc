import NutriaDocument from "./model/NutriaDocument.ts";
import User from "./model/User.ts";
import { KeyFile} from "../../core"
import CreateMediaTask from "./tasks/CreateMediaTask.ts";

export default interface DocumentService {

  findDocument(id: string): Promise<NutriaDocument>

  findOrCreateDocument(key?: string, workspace?: string): Promise<NutriaDocument>

  createMedia(document: NutriaDocument, file: KeyFile): CreateMediaTask

  getUser(): Promise<User>
}