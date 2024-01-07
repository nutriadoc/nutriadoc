/// <reference types="vite/client" />

import {Nutria} from "./index.ts";

declare global {
  interface Window {
    Nutria: Nutria,
  }
}

window.Nutria = window.Nutria || {}