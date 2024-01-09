import InactiveMenuItem from "../menu/InactiveMenuItem.ts";
import {className, input, on, placeholder} from "../views.ts";
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
      input(
        className("search"),
        on("input", this.onInput.bind(this)),
        placeholder("Search for a language")
      )
    )
  }

  protected onInput(event: Event) {
    const input = event.currentTarget as HTMLInputElement
    console.debug('change', input)
    // this.dispatchEvent(new SearchChangeEvent(input.value))
    this.props.onChange?.(new SearchChangeEvent(input.value))
  }
}