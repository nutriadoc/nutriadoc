import type {StoryObj, Meta} from '@storybook/html'
import Editor from "../index"

const meta = {
  title: 'Editor/List',
  render: () => {

    const root = document.createElement("div")
    root.className = "root"
    const doc = Editor(root)

    for (let i  = 1; i < 7; i++) {
      const start = doc.quill.getLength() - 1
      doc.quill.insertText(start, `List ${i}\n`, 'user')
    }


    console.debug("delta", doc.quill.getContents())

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


