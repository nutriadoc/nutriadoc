import Floating from "../floating/Floating.ts";
import {
  _for, autoFocus,
  button,
  className,
  div,
  id,
  input,
  label,
  onChange,
  onClick, onKeyDown,
  placeholder,
  style,
  text, value,
} from "../views.ts";
import Position from "../floating/Position.ts";
import View from "../View.ts";
import LinkEvent from "../toolbar/inline/link/LinkEvent.ts";

export default class LinkSettings extends Floating {

  public _url: string = ""

  public _text: string = ""

  public constructor(url?: string, text?: string) {
    super(Position.Center)
    this._url = url ?? ''
    this._text = text ?? ''
  }

  public get className(): string {
    return "link"
  }

  public render(): Node | Node[] {

    if (this._rendered) return super.render()

    const fieldStyles = style({
      display: "flex",
      flexDirection: "column",
      gap: "5px"
    })

    const labelStyles = style({
      display: "block",
      width: "150px",
    })

    const inputStyles = style({
      width: "500px",
      borderRadius: "4px",
      border: "1px #CCC solid",
      lineHeight: "200%",
      outline: "none",

    })

    this.addElement(
      div(
        className("link-container"),
        style({
          display: "flex",
          flexDirection: "column",

          padding: "15px",
          gap: "15px"
        }),
        onKeyDown(this.onKeyDown.bind(this)),
        div(
          className("field"),
          fieldStyles,
          label(
            text("Link"),
            _for("url"),
            labelStyles,
          ),
          input(
            id("url"),
            inputStyles,
            value(this.url),
            onKeyDown(this.onKeyDown.bind(this)),
            autoFocus(),
            placeholder("Please enter a URL"),
            onChange(this.onLinkChange.bind(this))
          ),
        ),
        div(
          className("field"),
          fieldStyles,
          label(
            text("Link Text"),
            _for("text"),
            labelStyles,
          ),
          input(
            id("text"),
            inputStyles,
            value(this.text),
            onKeyDown(this.onKeyDown.bind(this)),
            placeholder("Please enter a URL"),
            onChange(this.onLinkTextChange.bind(this))
          ),
        ),
        div(
          className("bottom"),
          style({
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
            gap: "10px"
          }),
          button(
            text("Cancel"),
            className("default"),
            onClick(this.onDefaultButtonClick.bind(this))
          ),
          button(
            text("Confirm"),
            className("primary"),
            onClick(this.onPrimaryButtonClick.bind(this))
          ),
        ),
      )
    )

    return super.render()
  }

  public visible(relative?: HTMLElement | View | undefined, container?: View) {
    super.visible(relative, container)

    setTimeout(() => {
      this._element.querySelector("input")?.focus()
    }, 100)
  }

  protected onKeyDown(e: KeyboardEvent) {
    if (e.key === "Escape") {
      e.preventDefault()
      e.stopPropagation()

      this.hidden()
    }

    if (e.key === "Enter" && e.ctrlKey)
      this.onPrimaryButtonClick()
  }

  protected onLinkChange(e: Event) {
    const input = e.target as HTMLInputElement
    this.url = input.value
  }

  protected onLinkTextChange(e: Event) {
    const input = e.target as HTMLInputElement
    this.text = input.value
  }

  protected onDefaultButtonClick() {
    this.dismiss()
  }

  protected onPrimaryButtonClick() {
    this.hidden()

    this.dispatchEvent(new LinkEvent(this.url, this.text))
  }

  public get url(): string {
    return this._url
  }

  public set url(url: string) {
    this._url = url
    this.find(id("url"))?.assignUnits(value(url))
  }

  public get text(): string {
    return this._text
  }

  public set text(text: string) {
    this._text = text
    this.find(id("text"))?.assignUnits(value(text))
  }
}