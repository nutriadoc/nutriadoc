import {Action, createBrowserHistory, History, Location} from "history"
import RouterListener from "./RouterListener"
import Route from "./Route"
import RouteParameters from "./RouteParameters"
import { pathToRegexp, Key } from "path-to-regexp"
import Cargo from "./Cargo";

export default class Router<T> {

  history: History

  listeners: RouterListener<T>[] = []

  routes: Route<T>[] = []

  stacks: Cargo<T>[] = []

  constructor(routes: Route<T>[]) {
    this.history = createBrowserHistory()
    this.history.listen(this.onHistoryListen.bind(this))
    this.routes = routes
  }

  onHistoryListen({action, location}: {action: Action, location: Location}) {
    console.debug('on history listen', {action ,location})
    switch (action) {
      case Action.Replace:
      case Action.Push: {
        this.appear(this.getCargo(location))

        break
      }
      case Action.Pop: {
        this.pop()
        break
      }
    }
  }

  pop() {
    const cargo = this.stacks.pop()
    const i = this.stacks.length - 1
    const current = this.stacks[i]
    if (!current) return

    this.listeners.forEach(listener => listener.pop(cargo, current))
  }

  appear(cargo: Cargo<T>) {
    this.stacks.push(cargo)
    this.listeners.forEach(listener => listener.appear(cargo))
  }

  addListener(listener: RouterListener<T>) {
    this.listeners.push(listener)
  }

  getCurrentRoute(): Route<T> {
    return this.getRoute(this.history.location)
  }

  getRoute(location: Location): Route<T> {
    const routes = this.routes.map(route => ({ exec: pathToRegexp(route.path).exec(location.pathname), route }))
    const [result] = routes.filter(r => !!r.exec)
    return result.route
  }

  getCurrentCargo() {
    return this.getCargo(this.history.location)
  }

  getCargo(location: Location): Cargo<T> {
    const keys: Key[] = []
    const routes = this.routes.map(route => ({ exec: pathToRegexp(route.path, keys).exec(location.pathname), route }))
    const [result] = routes.filter(r => !!r.exec)

    return new Cargo(result.route, RouteParameters.parse(keys, result.exec))
  }
}