import type {StoryObj, Meta} from '@storybook/html'
import {create} from "../../../index"

const meta = {
  title: 'Toolbar/Inline/Link',
  tags: [],
  render: () => {

    const root = document.createElement("div")
    root.className = "root"

    const doc = create(root)

    for (let i = 0; i < 10; i++) {
      doc.insertText(doc.getLength() - 1, "Link: ")
      doc.insertText(doc.getLength() - 1, `google ${i}\n`, "link", "https://google.com")
    }

    setTimeout(() => {
      doc.setSelection(9, 0)
      doc.focus()
    }, 20)

    return root
  },
  argTypes: {},
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Link: Story = {
  args: {},
}


