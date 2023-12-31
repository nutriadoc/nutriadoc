import Floating from "../floating/Floating.ts";
import {
  _for,
  button,
  className,
  div,
  id,
  input,
  label,
  onChange,
  onClick,
  placeholder,
  style,
  text, value,
} from "../views.ts";
import Position from "../floating/Position.ts";
import ILinkBinding from "./ILinkBinding.ts";

export default class Link extends Floating {

  protected binding: ILinkBinding

  protected url: string = ""

  protected text: string = ""

  public constructor(url: string | undefined, text: string | undefined, binding: ILinkBinding) {
    super(Position.Center);

    this.text = text ?? ""
    this.url = url ?? ""

    this.binding = binding
  }

  public get className(): string {
    return "link"
  }

  public render(): Node | Node[] {

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
      width: "500px"
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
    this.binding.link(this.url, this.text)
    this.dismiss()
  }
}