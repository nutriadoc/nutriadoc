import type {StoryObj, Meta} from '@storybook/html'
import {create} from "../index.ts";
import {div, style} from "@nutriadoc/classes";

const meta = {
  title: 'Editor/Toolbar',
  tags: [],
  render: () => {

    const doc = div()
    const container = div(
      div(style({height: "1000px"})),
      doc
    )
    create(doc).render()
    return container.render() as Node
  },
  argTypes: {},
} satisfies Meta;

export default meta;
type Story = StoryObj;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {},
}


