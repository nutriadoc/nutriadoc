import axios, {AxiosInstance, CreateAxiosDefaults} from "axios";

export default abstract class BaseService {

  protected axios: AxiosInstance

  protected baseUrl: string

  public constructor(baseUrl: string) {
    this.baseUrl = baseUrl

    const token = localStorage.getItem("token")

    const config: CreateAxiosDefaults = {
      baseURL: `http://${baseUrl}`
    }
    if (!!token)
      config.headers = {
        Authorization: `Bearer ${token}`
      }

    this.axios = axios.create(config)
  }
}