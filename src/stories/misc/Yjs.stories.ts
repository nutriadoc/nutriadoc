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
    ydoc.on("update", update => {
      console.debug('ydoc update', update)
    })

    console.debug('ydoc encode state as update', Y.encodeStateAsUpdate(ydoc))

    const editor = new Quill(root)
    new QuillBinding(text, editor)

    text.observe((event) => {
      console.debug('ydoc text', event.changes)
    })

    editor.insertText(0, "Hello world\n")

    console.debug("ydoc encode state as update", Y.encodeStateAsUpdate(ydoc))

    editor.insertText(editor.getLength() - 1, "Hello world\n")

    console.debug("ydoc encode state as update", Y.encodeStateAsUpdate(ydoc))
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


