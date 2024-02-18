import CreateObjectCredential from "./CreateObjectCredential.ts";

export default class Attachment {

  protected _id: string

  protected _key: string

  protected _size: number

  protected _type: string

  protected _createdAt: Date

  protected _readUrl: string

  protected _createObjectCredential: CreateObjectCredential

  constructor(id: string, key: string, size: number, type: string, createdAt: Date, readUrl: string, createObjectCredential: CreateObjectCredential) {
    this._id = id
    this._key = key
    this._size = size
    this._type = type
    this._createdAt = createdAt
    this._readUrl = readUrl
    this._createObjectCredential = createObjectCredential
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

  get readUrl(): string {
    return this._readUrl
  }

  get createObjectCredential(): CreateObjectCredential {
    return this._createObjectCredential
  }
}