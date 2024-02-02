export default class Environment {
  static [key: string]: string

  static {
    Object.keys(import.meta.env).forEach(key => {
      Environment[key] = import.meta.env[key]
    })
  }
}