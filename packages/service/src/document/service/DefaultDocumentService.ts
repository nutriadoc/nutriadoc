import DocumentService from "./DocumentService.ts";
import NutriaDocument from "./model/NutriaDocument.ts";
import axios, {AxiosInstance} from "axios";
import User from "./model/User.ts";
import LocalStorageUserRepository from "./repository/LocalStorageUserRepository.ts";
import CreateMediaTask from "./tasks/CreateMediaTask.ts";
import NutriaDocumentAssembler from "./assembler/NutriaDocumentAssembler.ts";
import {KeyFile} from "@nutriadoc/classes";

export default class DefaultDocumentService implements DocumentService {

  protected axios: AxiosInstance

  protected userRepository: LocalStorageUserRepository = new LocalStorageUserRepository()

  public constructor(baseUrl: string) {
    this.axios = axios.create({
      baseURL: `https://${baseUrl}`
    })
  }

  async findDocument(id: string): Promise<NutriaDocument> {
    const response = await this.axios.get(`/document/${id}`)
    const json = response.data
    const assembler = new NutriaDocumentAssembler()
    return assembler.fromDTO(id, json)
  }

  async findOrCreateDocument(key?: string, workspace?: string): Promise<NutriaDocument> {
    
    const response = await this.axios.post("/document", {
      workspace,
      key,
    })

    const json = response.data
    const assembler = new NutriaDocumentAssembler()
    return assembler.fromDTO(key ?? "", json)
  }

  createMedia(document: NutriaDocument, file: KeyFile): CreateMediaTask {
    return new CreateMediaTask(document, file)
  }

  getUser(): Promise<User> {
    return this.userRepository.getUser()
  }
}