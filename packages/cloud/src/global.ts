import Login from "./login/Login.ts";
import { Console } from "./"

if (!window.cloud) {
  window.cloud = {
    Login: Login,
    Console: Console
  }
}