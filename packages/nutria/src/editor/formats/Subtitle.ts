import AbstractTitle from "./AbstractTitle.ts"

class Title extends AbstractTitle {

  static blotName = 'subtitle'
  static tagName = 'H2'

  static level: number = 998
}

export default Title