import type {StoryObj, Meta} from '@storybook/html'
import {create} from "../index"

const meta = {
  title: 'Editor/Quote',
  render: () => {

    const root = document.createElement("div")
    root.className = "root"
    const doc = create(root)


    doc.insertText(0, "Quote\n")
    doc.setSelection(0, 6)

    doc.focus()

    // doc.format("blockquote", true)
    doc.formatText(0, 6, { blockquote: true })

    return root
  },
  argTypes: {},
} satisfies Meta;

export default meta;
type Story = StoryObj;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Quote: Story = {
  args: {},
}


