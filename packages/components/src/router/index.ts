import RouterContainer from "./RouterContainer";
import {IUnit} from "@nutriadoc/classes";

export * from './decorators'
export * from "./demo"

export { default as RouterContainer } from "./RouterContainer"

export function routerContainer(...units: IUnit[]) {
  return new RouterContainer(undefined, ...units)
}