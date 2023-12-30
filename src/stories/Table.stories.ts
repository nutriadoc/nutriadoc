import type {StoryObj, Meta} from '@storybook/html'
import Editor from "../index"
// import NTRTable from "../ui/table/NTRTable.ts";
import Quill from "quill";

type TableArgs = {
  init?: (quill: Quill) => void
}

const meta = {
  title: 'Editor/Table',
  tags: [],
  render: (args: TableArgs) => {

    const root = document.createElement("div")
    root.className = "root"
    const doc = Editor(root)

    args?.init?.(doc.quill)
    // const tableElement = doc.quill.root.getElementsByTagName("table")[0]
    // new NTRTable(tableElement)
    return root
  },
  argTypes: {},
} satisfies Meta<TableArgs>;

export default meta;
type Story = StoryObj<TableArgs>;



// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Table: Story = {
  args: {
    init: (quill: Quill) => {
      quill.insertText(0, '1.1\n', { table: 'a'})
      quill.insertText(quill.getLength() - 1, '1.2\n', { table: 'a'})
      quill.insertText(quill.getLength() - 1, '1.3\n', { table: 'a'})
      quill.insertText(quill.getLength() - 1, '3.1\n', { table: 'c'})
      quill.insertText(quill.getLength() - 1, '3.2\n', { table: 'c'})
      quill.insertText(quill.getLength() - 1, '3.3\n', { table: 'c'})
      quill.insertText(12, '2.1\n', { table: 'b'})
      quill.insertText(16, '2.2\n', { table: 'b'})
      quill.insertText(20, '2.3\n', { table: 'b'})
    }
  },
}

export const EmptyTable: Story = { }

