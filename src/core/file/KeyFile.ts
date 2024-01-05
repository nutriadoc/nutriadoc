import Key from "../Key.ts";
import KeyPool from "../KeyPool.ts";

export default class KeyFile {
  
  protected _key: Key

  protected _file: File

  protected pool: KeyPool = KeyPool.shared

  public constructor(key: Key, file: File) {
    this._key = key
    this._file = file
    this.pool.set(key.int, this)
  }

  public get key(): Key {
    return this._key
  }

  public get file(): File {
    return this._file
  }

  static create(file: File): KeyFile {
    return new KeyFile(new Key(), file)
  }
}