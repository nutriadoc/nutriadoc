import { Nutria } from "../index.ts";

declare global {
  interface Window {
    Nutria: Nutria
  }
}