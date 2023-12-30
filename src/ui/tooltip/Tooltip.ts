import Floating from "../floating/Floating.ts"
import Position from "../floating/Position.ts"
import IView from "../IView.ts"
import TooltipTextContent from "./TooltipTextContent.ts";
import View from "../View.ts";

export default class Tooltip extends Floating {

  protected text: string | undefined = undefined

  protected contentView: TooltipTextContent

  public constructor(content: string | IView, position?: Position) {
    const contentView = Tooltip.createContent(content)
    super(position ?? Position.BottomLeft, contentView)

    this.contentView = contentView[0]
  }

  public set content(content: string | undefined) {
    this.text = content

    if (content === undefined) return
    this.contentView.content = content
  }

  public visible(relatvie?: HTMLElement | View | undefined) {
    if (this.text === undefined) return
    super.visible(relatvie);
  }

  static createContent(content: string | IView | IView[]): TooltipTextContent[] {
    let views: TooltipTextContent[]

    if (typeof content === "string")
      views = [new TooltipTextContent(content as string)]
    else
      views = []
    return views
  }
}