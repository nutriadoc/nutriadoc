import ILinkBinding from "./ILinkBinding.ts";

export default abstract class LinkBinding implements ILinkBinding {

  protected _payload?: any


  protected constructor(payload?: any) {
    this._payload = payload
  }

  abstract link(url: string, text: string): void;

  get payload(): any {
    return this._payload
  }

}