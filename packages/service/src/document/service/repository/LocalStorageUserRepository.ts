import UserRepository from "./UserRepository.ts";
import User from "../model/User.ts";
import { Random } from "@nutriadoc/classes"

export default class LocalStorageUserRepository implements UserRepository {
  getUser(): Promise<User> {
    const item = localStorage.getItem("user")
    let user: any = null
    if (item == null) {
      user = {
        name: `User ${Random.getRandomNumber(1, 100000)}`,
        color: "",
      }
    } else {
      user = JSON.parse(item)
    }

    return Promise.resolve(new User(user.name, user.color))
  }

}