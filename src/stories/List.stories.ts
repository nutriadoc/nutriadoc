import type {StoryObj, Meta} from '@storybook/html'
import {create} from "../index"

const meta = {
  title: 'Editor/List',
  render: () => {

    const root = document.createElement("div")
    root.className = "root"
    const doc = create(root)

    for (let i  = 1; i < 7; i++) {
      const start = doc.quill.getLength() - 1
      doc.quill.insertText(start, `List ${i}\n`, 'user')
    }

    return root
  },
  argTypes: {},
} satisfies Meta;

export default meta;
type Story = StoryObj;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const ListStories: Story = {
  args: {},
}


