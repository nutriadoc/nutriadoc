import AbstractTitle from "./AbstractTitle.ts";

class Title extends AbstractTitle {

  static blotName = 'title'
  static tagName = 'H1'

  static level: number = 999
}

export default Title