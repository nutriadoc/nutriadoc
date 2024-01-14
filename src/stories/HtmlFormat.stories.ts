import type {StoryObj, Meta} from '@storybook/html'
import {create} from "../index"
import {div} from "../ui/views.ts";

const meta = {
  title: 'Editor/HtmlFormat',

  render: () => {
    const container = div()
    const doc = create(container, { key: "html_format_4"})

    doc.insertText(0, '1\n')
    doc.insertText(2, '\n', 'html', `<h1>Nutria</h1><p>Hi, there!</p>`)
    doc.formatText(2, 1, 'readonly', true)

    doc.addEventListener("ready", () => {
      console.debug(doc.getHtml())
    })

    return container.render() as Node
  },
  argTypes: {},
} satisfies Meta;

export default meta;
type Story = StoryObj;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const HtmlFormat: Story = {
  args: {},
}


