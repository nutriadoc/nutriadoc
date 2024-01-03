import type {StoryObj, Meta} from '@storybook/html'
import {create} from "../index"
import {div, name, style} from "../ui/views.ts";
import IView from "../ui/IView.ts";

type ImageArgs = {

}

const meta = {
  title: 'Editor/Image',
  tags: [],
  render: () => {
    const root = div(
      div(
        style({
          height: "100px"
        }),

      ),
      div(
        style({
          display: "flex",
          flexDirection: "row"
        }),
        div(
          style({
            width: "100px",
          })),
        div(
          name("root"),
          style({
          })
        ),
      )
    )

    const doc = create(root.find(name("root")) as IView)
    doc.quill.on("text-change", (delta, _, __) => {
      console.debug('text-change', delta)
    })

    doc.quill.insertText(0, "Image")
    doc.quill.insertEmbed(doc.quill.getLength() - 1, "image", 'https://placehold.co/300x200')
    doc.quill.insertEmbed(doc.quill.getLength(), "image", 'https://placehold.co/300x200')

    return root.render() as Node
  },
  argTypes: {},
} satisfies Meta<ImageArgs>;

export default meta;
type Story = StoryObj<ImageArgs>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Image: Story = {
  args: {
  },
}


