import DocumentService from "./DocumentService.ts";
import NutriaDocument from "./model/NutriaDocument.ts";
import axios, {AxiosInstance} from "axios";
import {NutriaApiHost} from "../../editor/Option.ts";
import User from "./model/User.ts";
import LocalStorageUserRepository from "./repository/LocalStorageUserRepository.ts";
import KeyFile from "../../core/file/KeyFile.ts";
import CreateMediaTask from "./tasks/CreateMediaTask.ts";

export default class DefaultDocumentService implements DocumentService {

  protected axios: AxiosInstance

  protected userRepository: LocalStorageUserRepository = new LocalStorageUserRepository()

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

  createMedia(document: NutriaDocument, file: KeyFile): CreateMediaTask {
    return new CreateMediaTask(document, file)
  }

  getUser(): Promise<User> {
    return this.userRepository.getUser()
  }
}