import type {StoryObj, Meta} from '@storybook/html'
import {create} from "../index"
import {div, style} from "../ui/views.ts";

interface SizeArgs {
  height?: number | string
}

const meta = {
  title: 'Editor/Size',
  tags: [],
  render: (args: SizeArgs) => {

    const root = document.createElement("div")
    root.className = "root"
    const doc = create(root,
      { height: args.height}
    )

    doc.insertText(0, "Nutria", { header: 1 })


    return div(
      style({height: "100%"}),
      div(style({height: "500px",})),
      doc,
    ).render() as Node
  },
  argTypes: {},
} satisfies Meta<SizeArgs>

export default meta;
type Story = StoryObj<SizeArgs>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Percent: Story = {
  args: {
    height: "30%"
  },
}

export const Auto: Story = {
  args: {
    height: "auto"
  },
}


