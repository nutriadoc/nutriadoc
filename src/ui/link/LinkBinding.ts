import ILinkBinding from "./ILinkBinding.ts";
import ILinkRange from "./ILinkRange.ts";

export default abstract class LinkBinding implements ILinkBinding {

  protected _payload?: ILinkRange


  protected constructor(payload?: ILinkRange) {
    this._payload = payload
  }

  abstract link(url: string, text: string): void;

  get payload(): ILinkRange | undefined {
    return this._payload
  }

}