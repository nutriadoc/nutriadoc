import UserRepository from "./UserRepository.ts";
import User from "../model/User.ts";
import Random from "../../../core/Random.ts";
import {randomColor} from "../../../ui/color_picker/Colors.ts";

export default class LocalStorageUserRepository implements UserRepository {
  getUser(): Promise<User> {
    const item = localStorage.getItem("user")
    let user: any = null
    if (item == null) {
      user = {
        name: `User ${Random.getRandomNumber(1, 100000)}`,
        color: randomColor()
      }
    } else {
      user = JSON.parse(item)
    }

    return Promise.resolve(new User(user.name, user.color))
  }

}