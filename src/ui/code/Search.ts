import InactiveMenuItem from "../menu/InactiveMenuItem.ts";
import {autoFocus, className, input, on, placeholder} from "../views.ts";
import SearchChangeEvent from "./SearchChangeEvent.ts";
import IUnit from "../view/unit/IUnit.ts";

export interface SearchProps {
  onChange?: (event: SearchChangeEvent) => void
}

export default class Search extends InactiveMenuItem {

  protected search: string = ""

  protected props: SearchProps

  public constructor(props: SearchProps, ...units: IUnit[]) {
    super(
      "search",
      ...units
    )

    this.props = props

    this.assignUnits(
      className("search"),
      input(
        on("input", this.onInput.bind(this)),
        placeholder("Search for a language"),
        autoFocus()
      )
    )
  }

  public focus() {
    const input = this.element.querySelector("input") as HTMLInputElement
    input.focus()
  }

  public empty() {
    const input = this.element.querySelector("input") as HTMLInputElement
    input.value = ""
  }

  protected onInput(event: Event) {
    const input = event.currentTarget as HTMLInputElement
    console.debug('change', input)
    // this.dispatchEvent(new SearchChangeEvent(input.value))
    this.props.onChange?.(new SearchChangeEvent(input.value))
  }
}