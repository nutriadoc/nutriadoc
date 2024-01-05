import type {StoryObj, Meta} from '@storybook/html'
import {create} from "../index"

const meta = {
  title: 'Editor/ClearFormatting',
  tags: [],
  render: () => {

    const root = document.createElement("div")
    root.className = "root"

    const doc = create(root)

    doc.insertText(0, "Text1", { bold: true, italic: true })
    doc.removeFormat(0, 5)
    doc.formatText(0, 5, { bold: true, italic: true })

    setTimeout(() => {
      doc.focus()
      doc.setSelection(0, 5)
    })

    return root
  },
  argTypes: {},
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const ClearFormatting: Story = {
  args: {},
}


