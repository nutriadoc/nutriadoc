import { Nutria } from "../index.ts";
import highlightjs from "@types/highlightjs";

declare global {
  interface Window {
    Nutria: Nutria
  }

  const hljs: highlightjs
}