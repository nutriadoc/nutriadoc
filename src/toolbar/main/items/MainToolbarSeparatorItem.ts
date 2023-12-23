import MainToolbarItem from "../MainToolbarItem";

export class MainToolbarSeparatorItem extends MainToolbarItem {
  constructor() {
    super("separator", "", false);
    
    this._element.classList.add("separator");
  }
}