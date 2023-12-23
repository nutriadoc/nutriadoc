import type { StoryObj, Meta } from '@storybook/html'
import Editor from "../index"

interface InlineContextualMenuProps {
}

const meta = {
  title: 'Example/InlineContextualMenu',
  tags: ['autodocs'],
  render: (args) => {
    let contents = `<h2>你好朋友</h2>
<p>这段<b>文字</b>演示行内工具栏</p>`

    for (let i = 0; i < 100; i++) {
      contents += `<p>第${i}行</p><br />\n`
    }
    const root = document.createElement("div")
    root.className = "root"
    Editor(root, contents)

    return root
  },
  argTypes: {
  },
} satisfies Meta<InlineContextualMenuProps>;

export default meta;
type Story = StoryObj<InlineContextualMenuProps>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {

  },
}


