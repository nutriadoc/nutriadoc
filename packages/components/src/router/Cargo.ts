import Route from "./Route";
import RouteParameters from "./RouteParameters";

export default class Cargo<T> {

  protected _route: Route<T>

  protected _parameters: RouteParameters

  public constructor(route: Route<T>, parameters: RouteParameters) {
    this._route = route
    this._parameters = parameters
  }

  get route(): Route<T> {
    return this._route
  }

  get parameters(): RouteParameters {
    return this._parameters
  }
}
