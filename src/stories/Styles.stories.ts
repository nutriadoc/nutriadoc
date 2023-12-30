import type {StoryObj, Meta} from '@storybook/html'
import {create} from "../index"

const meta = {
  title: 'Editor/Font',

  render: () => {

    const root = document.createElement("div")
    root.className = "root"
    const doc = create(root)

    doc.quill.insertText(0, "Hello friend\n", { header: 1, title: true }, 'user')
    doc.quill.insertText(doc.quill.getLength() - 1, "Hello friend\n", { header: 2, subtitle: true }, 'user')

    for (let i  = 1; i < 7; i++) {
      const start = doc.quill.getLength() - 1
      doc.quill.insertText(start, "Hello friend\n", { header: i }, 'user')
    }

    return root
  },
  argTypes: {},
} satisfies Meta;

export default meta;
type Story = StoryObj;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Styles: Story = {
  args: {},
}


