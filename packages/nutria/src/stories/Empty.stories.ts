import type {StoryObj, Meta} from '@storybook/html'
import {create} from "../index"

const meta = {
  title: 'Editor/Empty',
  tags: [],
  render: () => {

    const root = document.createElement("div")
    root.className = "root"
    create(root)

    return root
  },
  argTypes: {},
} satisfies Meta;

export default meta;
type Story = StoryObj;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Empty: Story = {
  args: {},
}


