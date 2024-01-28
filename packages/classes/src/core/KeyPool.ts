export default class KeyPool extends Map<object, object> {

  static shared: KeyPool = new KeyPool()

}