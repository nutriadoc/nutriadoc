import { default as Login } from "./Login"

if (!window.cloud) {
  window.cloud = {
    Login: Login
  }
}