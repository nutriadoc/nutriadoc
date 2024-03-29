import type {StoryObj, Meta} from '@storybook/html'
import {create} from "../index"
import QuillEditor from "../editor/quilljs/QuillEditor.ts";

const meta = {
  title: 'Editor/Font',

  render: () => {

    const root = document.createElement("div")
    root.className = "root"
    const doc = create(root)

    console.debug(doc.insertText(0, "Title\n", { title: true }, 'user'))
    doc.insertText(doc.getLength() - 1, "Subtitle\n", { subtitle: true }, 'user')

    for (let i  = 1; i < 7; i++) {
      const start = doc.getLength() - 1
      doc.insertText(start, "Hello friend\n", { header: i }, 'user')
    }

    doc.addEventListener(
      'ready',
      () => {
        console.debug((doc.editor as QuillEditor).quill.getContents())
      },
      { once: true}
    )



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


