import { Key, pathToRegexp } from "path-to-regexp"

export default class RouteParameters extends Map<string, object> {

  get<T>(key: string): T {
    return super.get(key) as T
  }

  static parse(keys: Key[], exec: RegExpExecArray): RouteParameters {

    const parameters = new RouteParameters()

    keys.forEach((key, index) => {
      if (typeof key.name == 'string')
        parameters.set(key.name as string, exec[index + 1] as unknown as object)
      else
        throw new Error("not implemented")
    })

    return parameters
  }
}