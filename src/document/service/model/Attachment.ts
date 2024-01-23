import SignaturedUrl from "./SignaturedUrl"

export default class Attachment {

  protected _id: string

  protected _key: string

  protected _size: number

  protected _type: string

  protected _createdAt: Date

  protected _url: SignaturedUrl


  constructor(id: string, key: string, size: number, type: string, createdAt: Date, url: SignaturedUrl) {
    this._id = id
    this._key = key
    this._size = size
    this._type = type
    this._createdAt = createdAt
    this._url = url
  }

  get id(): string {
    return this._id
  }

  get key(): string {
    return this._key
  }

  get size(): number {
    return this._size
  }

  get type(): string {
    return this._type
  }

  get createdAt(): Date {
    return this._createdAt
  }

  get url(): SignaturedUrl {
    return this._url
  }

}