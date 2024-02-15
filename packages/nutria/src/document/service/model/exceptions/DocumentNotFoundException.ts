export default class DocumentNotFoundException extends Error {

  protected _id: string

  public get id(): string {
    return this._id
  }

  public constructor(id: string) {
    super(`Document with id ${id} not found`)
    this._id = id
  }
}