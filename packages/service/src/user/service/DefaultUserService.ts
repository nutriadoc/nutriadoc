import UserService from "./UserService.ts";
import Authentication from "../model/Authentication.ts";
import BaseService from "../../service/BaseService.ts";

export default class DefaultUserService extends BaseService implements UserService {

  async login(email: string, password: string): Promise<Authentication> {

    const response = await this.axios.post<Authentication>('/auth/login', { email, password })
    const authenticated = response.data

    localStorage.setItem("token", authenticated.token)

    return authenticated
  }

}