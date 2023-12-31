import type {StoryObj, Meta} from '@storybook/html'
import * as Y from "yjs"
import Quill from "quill";
import {QuillBinding} from "y-quill";

const meta = {
  title: 'Misc/Yjs',
  tags: [],
  render: () => {

    const root = document.createElement("div")
    root.className = "root"

    const ydoc = new Y.Doc()
    const text = ydoc.getText("quill")
    ydoc.on("update", () => {

    })



    const editor = new Quill(root)
    new QuillBinding(text, editor)


    editor.insertText(0, "Hello world\n")
    editor.insertText(editor.getLength() - 1, "Hello world\n")

    text.observe((event) => {
      console.log(event.delta)
    })

    const doc2 = new Y.Doc()
    const text2 = doc2.getText("quill")
    text2.observe((event) => {
      console.log('doc2', event.delta)
    })

    let updates = Y.encodeStateAsUpdate(ydoc)
    console.debug(updates)

    editor.insertText(editor.getLength() - 1, "3\n")
    console.debug(Y.encodeStateAsUpdate(ydoc))


    editor.insertText(editor.getLength() - 1, "4\n")
    updates = Y.encodeStateAsUpdate(ydoc)

    Y.applyUpdate(doc2, updates)

    setTimeout(() => {
      editor.insertText(editor.getLength() - 1, "5\n")
    }, 100)
    return root
  },
  argTypes: {},
} satisfies Meta;

export default meta;
type Story = StoryObj;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Yjs: Story = {
  args: {},
}


