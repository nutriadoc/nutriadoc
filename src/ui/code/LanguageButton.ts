import ActivationView from "../toolbar/main/items/ActivationView.ts";
import {className, onClick, svg, text} from "../views.ts";
import {ChevronDown} from "../styles/icons";
import Menu from "../menu/Menu.ts";
import Position from "../floating/Position.ts";
import DefaultMenuItem from "../menu/DefaultMenuItem.ts";
import hljs from "highlight.js";

export default class LanguageButton extends ActivationView {

  protected menu: Menu

  public constructor() {
    super(undefined)
    this.menu = new Menu(
      "languages",
      Position.LeftBottom,
      hljs.listLanguages().map(lang => {
        const ext = hljs.getLanguage(lang)
        return new DefaultMenuItem(lang, ext!.name!)
      })
    )
      .assignUnits(className("language-menu")) as Menu

    this.addElement(this.menu)

    this.assignUnits(
      className("language-button"),
      text("Language"),
      svg(ChevronDown),
      onClick(this.onClick.bind(this))
    )
  }

  protected onClick() {
    debugger
    this.menu.visible(this.element)
  }
}