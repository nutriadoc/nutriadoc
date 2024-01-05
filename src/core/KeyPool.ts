export default class KeyPool extends Map<number, object> {

  static shared: KeyPool = new KeyPool()
}