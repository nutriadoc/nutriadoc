import type {StoryObj, Meta} from '@storybook/html'
import { default as ToolbarComponent } from "../ui/toolbar/main/Toolbar.ts"
import ToolbarAction from "../ui/toolbar/main/ToolbarAction.ts";
import {NothingFormatter} from "../editor/formatter/IFormatter.ts";

import 'quill/dist/quill.core.css'
import 'bootstrap-icons/font/bootstrap-icons.css'


const meta = {
  title: 'Editor/Toolbar',
  tags: [],
  render: () => {

    const root = document.createElement("div")
    root.className = "root"

    const toolbar = ToolbarComponent.simple()
    toolbar.action = new ToolbarAction(toolbar, new NothingFormatter())
    toolbar.render()
    toolbar.addTo(root)


    const item = toolbar.findToolbarItem("insert")
    setTimeout(() => {
      item?.click()
    }, 100)


    return root
  },
  argTypes: {},
} satisfies Meta;

export default meta;
type Story = StoryObj;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {},
}


