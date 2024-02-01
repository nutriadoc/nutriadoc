import ActivationView from "../toolbar/main/items/ActivationView.ts";
import {className, onClick, svg, text, IView, View} from "@nutriadoc/classes";
import {ChevronDown} from "../styles/icons";
import Menu from "../menu/Menu.ts";
import Position from "../../../../classes/src/ui/floating/Position.ts";
import DefaultMenuItem from "../menu/DefaultMenuItem.ts";
import Search from "./Search.ts";
import SearchChangeEvent from "./SearchChangeEvent.ts";
import MenuEvent from "../menu/events/MenuEvent.ts";
import LanguageEvent from "./LanguageEvent.ts";
import {getAllLanguages} from "../../core/dev/Language.ts";

interface Language {

  name: string

  value: string

}

export default class LanguageButton extends ActivationView {

  protected menu: Menu

  protected search: Search = new Search({ onChange: this.onSearchChange.bind(this) })

  protected label: IView = View.new("span", text("Language"))

  protected allLanguages: Language[] = getAllLanguages()

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
      Position.BottomLeft,
      [
        this.search,
        ...this.allLanguageItems
        ]
    )
      .assignUnits(
        className("language-menu"),
      ) as Menu

    this.menu.addEventListener('select', this.onSelect.bind(this))
    this.menu.addEventListener('hidden', this.onMenuHide.bind(this))

    this.assignUnits(
      className("language-button"),
      this.label,
      svg(ChevronDown),
      onClick(this.onClick.bind(this))
    )
  }

  protected onSearchChange(event: SearchChangeEvent) {
    const lang = event.search.toLowerCase()
    this.renderLanguages(lang)
  }

  protected renderLanguages(language: string) {
    this.menu.findAll(className("ntr-menu-item")).forEach(item => {
      item.remove()
    })
    const filter = language == '' ?
      [...this.allLanguageItems] :
      this
        .allLanguageItems
        .filter(item => item.key.toLowerCase().includes(language))

    this.menu.addElement(filter)
  }

  protected onSelect(event: Event) {
    const e = event as MenuEvent
    this.label.element.textContent = e.menuItem.element.textContent

    this.dispatchEvent(new LanguageEvent(e.menuItem.key))
  }

  protected onClick() {
    this.renderLanguages('')
    this._isActivated = true

    this.menu.visible(this.element)
    this.search.focus()
  }

  protected onMenuHide() {
    this._isActivated = false
    this.deactivate()
    this.renderLanguages('')
    this.search.empty()
  }
}