import type {Meta, StoryObj} from '@storybook/html'
import {View, div, Floating as FloatingComponent, Position, style, text} from "../ui";


const meta = {
  title: 'Floating',
  tags: [],
  render: () => {
    const login = div(text("Login"))
    const floating = new FloatingComponent(
      Position.LeftBottom,
      [div(text("float"))]
    ).assignUnits(style({ width: "300px", backgroundColor: "#EFEFEF"})) as FloatingComponent

    setTimeout(() => {
      floating.visible(document.body)
    }, 1000)
    return div(
      div(
        style({
          display: "flex",
          flex: 1,
          justifyContent: "right",
        }),
        floating,
        login,
      )
    ).render() as Node
  },
  argTypes: {},
} satisfies Meta;

export default meta;
type Story = StoryObj;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Floating: Story = {
  args: {},
}


