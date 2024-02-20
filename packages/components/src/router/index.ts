
import RouterContainer from "./RouterContainer";
import {IUnit} from "@nutriadoc/classes";
import PushListener from "./PushListener";
import RouteView from "./RouteView";
import BackListener from "./BackListener";

export * from './decorators'
export * from "./demo"

export { default as RouterContainer } from "./RouterContainer"
export { default as RouteView } from "./RouteView"

export function routerContainer(...units: IUnit[]) {
  return new RouterContainer(undefined, ...units)
}

export function push(target: string, routeView: RouteView) {
  return new PushListener(target, routeView)
}

export function back(routeView: RouteView) {
  return new BackListener(routeView)
}