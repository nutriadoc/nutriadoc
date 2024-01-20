import type {StoryObj, Meta} from '@storybook/html'
import {create} from "../index"
import QuillEditor from "../editor/quilljs/QuillEditor.ts";

const meta = {
  title: 'Editor/Link',
  tags: [],
  render: () => {

    const root = document.createElement("div")
    root.className = "root"

    const doc = create(root)
    doc.insertText(0,"\n");
    doc.insertText(1, "google\n", "link", "https://google.com")
    doc.insertText(8, "google\n", "link", "https://google.com")

    setTimeout(() => {
      doc.setSelection(14, 0)
      const editor = doc.editor as QuillEditor
      console.debug(editor.quill.getContents())
    }, 1000)


    return root
  },
  argTypes: {},
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Link: Story = {
  args: {},
}


