import View from "./View.ts";

export function div(..._params: any) {
  return new View()
}

export function style(_style?: any): any {

}

export function svg(_html: string): Element {
  throw new Error("Not implemented")
}

export function className(_name: string) {
  return new View()
}