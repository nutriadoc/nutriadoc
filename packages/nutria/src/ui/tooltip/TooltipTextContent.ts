import { View } from "@nutriadoc/classes";

export default class TooltipTextContent extends View {

    public constructor(content: string) {
        const element = document.createElement("div")
        super(element)

        element.style.padding = "0px 6px"

        element.textContent = content
    }

    public set content(content: string) {
        this.element.textContent = content
    }
}