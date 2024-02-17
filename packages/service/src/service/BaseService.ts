import axios, {AxiosInstance, CreateAxiosDefaults} from "axios";

export default abstract class BaseService {

  protected axios: AxiosInstance

  public constructor(baseUrl: string) {

    const token = localStorage.getItem("token")

    const config: CreateAxiosDefaults = {
      baseURL: `https://${baseUrl}`
    }
    if (!!token)
      config.headers = {
        Authorization: `Bearer ${token}`
      }

    this.axios = axios.create(config)
  }
}