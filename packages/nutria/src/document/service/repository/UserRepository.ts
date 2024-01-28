import User from "../model/User.ts";

export default interface UserRepository {

  getUser(): Promise<User>
  
}