/// <reference types="vite/client" />

import {NutriaDoc} from "./index.ts";

declare global {
  interface Window {
    NutriaDoc: NutriaDoc,
  }
}

window.NutriaDoc = window.NutriaDoc || {}