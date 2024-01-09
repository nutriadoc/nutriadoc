import ActivationView from "../toolbar/main/items/ActivationView.ts";
import {className, onClick, svg, text} from "../views.ts";
import {ChevronDown} from "../styles/icons";
import Menu from "../menu/Menu.ts";
import Position from "../floating/Position.ts";
import DefaultMenuItem from "../menu/DefaultMenuItem.ts";
import hljs from "highlight.js";
import Search from "./Search.ts";
import SearchChangeEvent from "./SearchChangeEvent.ts";
import MenuEvent from "../menu/events/MenuEvent.ts";

interface Language {

  name: string

  value: string

}

export default class LanguageButton extends ActivationView {

  protected menu: Menu

  protected search: Search = new Search({ onChange: this.onSearchChange.bind(this) })

  protected allLanguages: Language[] = hljs
    .listLanguages()
    .map(lang => {
    const ext = hljs.getLanguage(lang)
    return { value: lang, name: ext?.name ?? ""}
  })

  protected allLanguageItems: DefaultMenuItem[] = this.allLanguages.map(lang =>
    new DefaultMenuItem(lang.value, lang.name)
      .assignUnits(
        className("ntr-language-menu-item"),
      ) as DefaultMenuItem
  )

  public constructor() {
    super(undefined)
    this.menu = new Menu(
      "languages",
      Position.LeftBottom,
      [
        this.search,
        ...this.allLanguageItems
        ]
    )
      .assignUnits(
        className("language-menu"),
      ) as Menu

    this.menu.addEventListener('select', this.onSelect.bind(this))

    this.addElement(this.menu)

    this.assignUnits(
      className("language-button"),
      text("Language"),
      svg(ChevronDown),
      onClick(this.onClick.bind(this))
    )
  }

  protected onSearchChange(event: SearchChangeEvent) {
    this.menu.findAll(className("ntr-menu-item")).forEach(item => {
      item.remove()
    })
    const filter = this
      .allLanguageItems
      .filter(item => item.key.toLowerCase().includes(event.search.toLowerCase()))

    this.menu.addElement(filter)
  }

  protected onSelect(event: Event) {
    const e = event as MenuEvent
    this.element.textContent = e.menuItem.element.textContent
  }

  protected onClick() {
    this.menu.visible(this.element)
  }
}