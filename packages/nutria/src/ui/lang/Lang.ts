export default class Lang {
  static setup() {
    document.documentElement.lang = navigator.language
  }

  static lang() {
    return navigator.language
  }
}