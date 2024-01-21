import Key from "../Key.ts";
import KeyPool from "../KeyPool.ts";

export default class KeyFile {
  
  protected _key: Key

  protected _file: File

  protected pool: KeyPool = KeyPool.shared

  protected _blob: string

  public constructor(key: Key, file: File) {
    this._key = key
    this._file = file
    this._blob = URL.createObjectURL(file)

    this.pool.set(key.int, this)
  }

  public get key(): Key {
    return this._key
  }

  public get file(): File {
    return this._file
  }

  public get blob(): string {
    return this._blob
  }

  static create(file: File): KeyFile {
    return new KeyFile(new Key(), file)
  }
}