import DocumentService from "./DocumentService.ts";
import NutriaDocument from "./model/NutriaDocument.ts";
import axios, {AxiosInstance} from "axios";
import {NutriaApiHost} from "../../editor/Option.ts";
import User from "./model/User.ts";
import LocalStorageUserRepository from "./repository/LocalStorageUserRepository.ts";
import { KeyFile} from "../../core";
import CreateMediaTask from "./tasks/CreateMediaTask.ts";
import NutriaDocumentAssembler from "./assembler/NutriaDocumentAssembler.ts";

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

    const json = response.data
    const assembler = new NutriaDocumentAssembler()
    const doc = assembler.fromDTO(json)

    return doc
  }

  createMedia(document: NutriaDocument, file: KeyFile): CreateMediaTask {
    return new CreateMediaTask(document, file)
  }

  getUser(): Promise<User> {
    return this.userRepository.getUser()
  }
}