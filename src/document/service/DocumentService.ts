import NutriaDocument from "./model/NutriaDocument.ts";

export default interface DocumentService {

  findOrCreateDocument(key?: string, workspace?: string): Promise<NutriaDocument>
}