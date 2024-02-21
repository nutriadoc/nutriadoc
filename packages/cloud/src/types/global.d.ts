import { Login, Console } from "../"

declare global {
  interface Window {
    cloud: {
      Login: typeof Login,
      Console: typeof Console
    }
  }

}

var cloud = window.cloud