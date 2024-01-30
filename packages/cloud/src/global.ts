import Login from "./login/Login.ts";

if (!window.cloud) {
  window.cloud = {
    Login: Login
  }
}