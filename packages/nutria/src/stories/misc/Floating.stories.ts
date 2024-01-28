import type {Meta, StoryObj} from '@storybook/html'
import { className, div, name, style, text, Position, View } from "@nutriadoc/classes";
import { Floating as FloatingComponent} from "@nutriadoc/classes"

const meta = {
  title: 'Misc/Floating',
  tags: [],
  render: () => {

    const root = div(
      name("root"),
      div(
        style({
          height: "2000px"
        }),
      ),
      div(className("hello"), text("hello")),
      div(
        style({
          height: "100px"
        }),
      ),
    )

    const floating = new FloatingComponent(
      Position.LeftTop,
      [div(text("Inline toolbar"))],
      "element",
      5
    )

    // floating.addTo(document.body)

    setTimeout(() => {
      // document.querySelector("#root")?.scroll?.({top: 2000})
      const hello = document.querySelector(".hello")!
      hello.scrollIntoView()
      const hel = root.find(className("hello")) as View
      // debugger
      floating.visible(hel)
    }, 100)

    return root.render() as Node
  },
  argTypes: {},
} satisfies Meta;

export default meta;
type Story = StoryObj;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Floating: Story = {
  args: {},
}


