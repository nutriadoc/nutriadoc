import Authentication from "../model/Authentication.ts";

export default interface UserService {

  login(email: string, password: string): Promise<Authentication>

}