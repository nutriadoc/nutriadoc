import type {StoryObj, Meta} from '@storybook/html'
import {create} from "../index"
import {div, name, style} from "../ui/views.ts";
import QuillEditor from "../editor/quilljs/QuillEditor.ts";

type ImageArgs = {

}

const meta = {
  title: 'Editor/Image',
  tags: [],
  render: () => {
    div(
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

    const doc = create(div())

    // doc.insertText(0, "Image")
    const firstPicturePosition = doc.getLength() - 1
    doc.insertEmbed(firstPicturePosition, "image", 'https://placehold.co/300x200')
    // doc.insertEmbed(doc.getLength(), "image", 'https://placehold.co/300x200')
    //
    // doc.formatText(firstPicturePosition, 1, "width", "150")
    // doc.formatText(firstPicturePosition, 1, "height", "300")

    doc.addEventListener("ready", () => {
      // doc.insertEmbed(0, "image", 'https://placehold.co/300x200')
      const quill = (doc.editor as QuillEditor).quill
      quill.insertEmbed(0, 'title', '')
      console.debug(quill.getContents())
    })


    return doc.render() as Node
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


