import NutriaDocument from "./model/NutriaDocument.ts";
import User from "./model/User.ts";

export default interface DocumentService {

  findOrCreateDocument(key?: string, workspace?: string): Promise<NutriaDocument>

  getUser(): Promise<User>
}