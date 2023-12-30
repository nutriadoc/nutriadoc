import type {StoryObj, Meta} from '@storybook/html'
import {create} from "../index"

const meta = {
  title: 'Editor/Collaboration',
  tags: [],
  render: () => {

    const root = document.createElement("div")
    root.className = "root"
    create(
      root,
      {
        collaboration: {
          // ws: "ws://localhost:1234"
          ws: "ws://collab.nutria-doc.com"
        },
        name: "index"
      }
    )

    return root
  },
  argTypes: {},
} satisfies Meta;

export default meta;
type Story = StoryObj;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Collaboration: Story = {
  args: {},
}


