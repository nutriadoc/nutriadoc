import type {StoryObj, Meta} from '@storybook/html'
import {contentEditable, div, style, text} from "../../ui/views.ts";

const meta = {
  title: 'Misc/Editable',
  tags: [],
  render: () => {

    const root = div(

      div(
        style({
          width: "100%",
          height: "100%",
        }),
        contentEditable(true),
        text("Hello world")
      ),
    )

    return root.render() as Node
  },
  argTypes: {},
} satisfies Meta;

export default meta;
type Story = StoryObj;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Editable: Story = {
  args: {},
}


