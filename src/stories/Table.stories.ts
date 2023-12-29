import type {StoryObj, Meta} from '@storybook/html'
import Editor from "../index"
import NTRTable from "../ui/table/NTRTable.ts";

const meta = {
  title: 'Editor/Table',
  tags: [],
  render: () => {

    const root = document.createElement("div")
    root.className = "root"
    const doc = Editor(root)

    doc.quill.insertText(0, '1\n', { table: 'a'})
    doc.quill.insertText(doc.quill.getLength() - 1, '2\n', { table: 'a'})
    doc.quill.insertText(doc.quill.getLength() - 1, '3\n', { table: 'a'})
    doc.quill.insertText(doc.quill.getLength() - 1, '4\n', { table: 'b'})
    doc.quill.insertText(doc.quill.getLength() - 1, '5\n', { table: 'b'})
    doc.quill.insertText(doc.quill.getLength() - 1, '6\n', { table: 'b'})

    new NTRTable(doc.quill.root.getElementsByTagName("table")[0])
    return root
  },
  argTypes: {},
} satisfies Meta;

export default meta;
type Story = StoryObj;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Table: Story = {
  args: {},
}


