import type {StoryObj, Meta} from '@storybook/html'
import {contentEditable, div, style, text} from "../../ui/views.ts";
import {create} from "../../index.ts";

const meta = {
  title: 'Editor/Attachment/Uploading Story',
  tags: [],
  render: () => {

    const root = create(div(
      style({
        width: "100%",
        height: "100%",
      }),
      contentEditable(true),
      text("Hello world"),
    ))

    return root.render() as Node
  },
  argTypes: {},
} satisfies Meta;

export default meta;
type Story = StoryObj;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const UploadingStory: Story = {
  args: {},
}


