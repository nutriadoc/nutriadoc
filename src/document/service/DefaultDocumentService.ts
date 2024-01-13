import DocumentService from "./DocumentService.ts";
import NutriaDocument from "./model/NutriaDocument.ts";
import axios, {AxiosInstance} from "axios";
import {NutriaApiHost} from "../../editor/Option.ts";

export default class DefaultDocumentService implements DocumentService {

  protected axios: AxiosInstance

  public constructor() {
    this.axios = axios.create({
      baseURL: `https://${NutriaApiHost}`
    })
  }

  async findOrCreateDocument(key?: string, workspace?: string): Promise<NutriaDocument> {

    const response = await this.axios.post("/document", {
      workspace,
      key,
    })

    return response.data as NutriaDocument
  }

}