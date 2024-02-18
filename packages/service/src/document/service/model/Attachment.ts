import SignaturedUrl from "./SignaturedUrl"
import Credentials from "./Credentials.ts";

export default class Attachment {

  protected _id: string

  protected _key: string

  protected _size: number

  protected _type: string

  protected _createdAt: Date

  protected _url?: SignaturedUrl

  protected _credentials: Credentials

  constructor(id: string, key: string, size: number, type: string, createdAt: Date, url: SignaturedUrl | undefined, credentials: Credentials) {
    this._id = id
    this._key = key
    this._size = size
    this._type = type
    this._createdAt = createdAt
    this._url = url
    this._credentials = credentials
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

  get url(): SignaturedUrl | undefined {
    return this._url
  }

  get credentials(): Credentials {
    return this._credentials
  }
}