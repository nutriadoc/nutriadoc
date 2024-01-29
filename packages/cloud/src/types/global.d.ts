import { Login } from "../"

declare global {
  interface Window {
    cloud: {
      Login: Login
    }
  }
}