import type {StoryObj, Meta} from '@storybook/html'
import {create} from "../index"
import Option from "../editor/Option.ts";

type ContentsArgs = {
  html?: string
}

const meta = {
  title: 'Editor/Contents',
  tags: [],
  render: (args) => {
    const element = document.createElement("div")

    let option: Option = {}

    if (!args.html)
      element.innerHTML = "<h1>Hi there</t>"
    else
      option.html = args.html

    const doc = create(element, option)

    console.debug(doc.getHtml())
    return doc.render() as Node
  },
  argTypes: {},
} satisfies Meta<ContentsArgs>;

export default meta;
type Story = StoryObj<ContentsArgs>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const InnerHTML: Story = {
  args: {},
}

export const OptionHTML: Story = {
  args: {
    html: "<h1>Hi there</h1>"
  },
}


