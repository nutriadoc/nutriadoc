import "reflect-metadata"

export default class Route<T> {

  protected _path: string

  protected _component: T

  constructor(path: string, component: T) {
    this._path = path
    this._component = component
  }

  get path(): string {
    return this._path
  }

  get component(): T {
    return this._component
  }

  static loadRoutes<T>(classes: T[]): Route<T>[] {

    return classes
      .filter(cls => cls !== undefined)
      .map(cls =>  ({ meta: Reflect.getMetadata('design:decorators', cls) || [], cls}))
      .filter(item => item.meta.length > 0)
      .map(item => (item.meta.map((param: { path: string}) => new Route<T>(param.path, item.cls))))
      .flatMap(x => x)
  }
}