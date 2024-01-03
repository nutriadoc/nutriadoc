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
      console.debug('text-change', {delta, deltas: doc.quill.getContents()})
    })

    doc.quill.insertText(0, "Image")
    const firstPicturePosition = doc.quill.getLength() - 1
    doc.quill.insertEmbed(firstPicturePosition, "image", 'https://placehold.co/300x200')
    doc.quill.insertEmbed(doc.quill.getLength(), "image", 'https://placehold.co/300x200')

    doc.quill.formatText(firstPicturePosition, 1, "width", "150")
    doc.quill.formatText(firstPicturePosition, 1, "height", "300")

    console.debug(doc.quill.getContents())

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


