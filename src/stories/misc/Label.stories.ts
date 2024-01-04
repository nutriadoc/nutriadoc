import type {StoryObj, Meta} from '@storybook/html'
import {div, input, name, on, onClick, style, text, type} from "../../ui/views.ts";
import Attribute from "../../ui/view/attribute/Attribute.ts";

const meta = {
  title: 'Misc/Label',
  tags: [],
  render: () => {

    const root = div(

      div(
        text("Upload"),
        onClick(() => {
          const upload = root.find(new Attribute("name", "upload"))
          upload?.element?.click()
        })
      ),

      input(
        name("upload"),
        type("file"),
        style({
          visibility: "hidden",
        }),
        on("change", function (e: any) {
          console.debug(e.target.files)
        })
      )
    )

    return root.render() as Node
  },
  argTypes: {},
} satisfies Meta;

export default meta;
type Story = StoryObj;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Label: Story = {
  args: {},
}


