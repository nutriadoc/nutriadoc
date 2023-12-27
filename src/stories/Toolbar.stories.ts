import type {StoryObj, Meta} from '@storybook/html'
import Toolbar from "../ui/toolbar/main/Toolbar.ts"

import 'quill/dist/quill.core.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import ToolbarAction from "../ui/toolbar/main/ToolbarAction.ts";
import {NothingFormatter} from "../editor/formatter/IFormatter.ts";

const meta = {
  title: 'Editor/Toolbar',
  tags: [],
  render: () => {

    const root = document.createElement("div")
    root.className = "root"

    const toolbar = Toolbar.simple()
    toolbar.action = new ToolbarAction(toolbar, new NothingFormatter())
    toolbar.render()
    toolbar.addTo(root)

    return root
  },
  argTypes: {},
} satisfies Meta;

export default meta;
type Story = StoryObj;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const ToolbarStories: Story = {
  args: {},
}


