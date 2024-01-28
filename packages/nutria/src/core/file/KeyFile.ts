import { KeyPool, Key } from "@nutriadoc/classes"
import mime from "mime"

export default class KeyFile {
  
  protected _key: Key

  protected _file: File

  protected pool: KeyPool = KeyPool.shared

  protected _blob: string

  public constructor(key: Key, file: File) {
    this._key = key
    this._file = file
    this._blob = URL.createObjectURL(file)

    this.pool.set(this.id as String, this)
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

  get id(): string {
    return this._blob
  }

  get type(): string {
    const mimeType = mime.getType(this.file.name)
    const [type] = mimeType?.split("/") ?? "attachment"
    
    return type == "video" ? 
      "video": type == "image" ? 
      "image" : "attachment"
  }

  static create(file: File): KeyFile {
    return new KeyFile(new Key(), file)
  }
}