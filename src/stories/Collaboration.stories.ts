import type {StoryObj, Meta} from '@storybook/html'
import {create} from "../index"
// import QuillEditor from "../editor/quilljs/QuillEditor.ts";

interface CollaborationArgs {

  key?: string

  workspace?: string
}

const meta = {
  title: 'Editor/Collaboration',
  tags: [],
  render: (args) => {

    const root = document.createElement("div")
    root.innerHTML = `<p>${Math.random()}</p><br />`
    root.className = "root"
    const doc = create(
      root,
      {
        key: args.key,
        // html: `<p>${Math.random()}</p>`
      }
    )
    // const quill = (doc.editor as QuillEditor).quill
    // quill.insertText(0, "Hello World")

    return root
  },
  argTypes: {},
} satisfies Meta<CollaborationArgs>;

export default meta;
type Story = StoryObj<CollaborationArgs>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Collaboration: Story = {
  args: {},
}

export const IndexKey: Story = {
  args: {
    key: "test3"
  }
}

export const WorkspaceAndKey: Story = {
  args: {
    key: "index",
    workspace: "e0a953c3-ee4e-4b0d-9b82-b0f405f6b857"
  }
}

export const DoNotHaveOwnKey: Story = {

}

export const UsingOwnCollaborationServiceWithoutOwnKey: Story = {

}

export const UsingOwnCollaborationServiceWithOwnKey: Story = {

}

export const CollaborationDisabled: Story = {

}

export const NoKey: Story = {
  args: {}
}


