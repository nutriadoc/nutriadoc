import Container from "./Container";
import {IUnit} from "@nutriadoc/classes";

export * from './decorators'
export { default as Container } from "./Container"

export function container(...units: IUnit[]) {
  return new Container(undefined, ...units)
}