import type {StoryObj, Meta} from '@storybook/html'
import {div, style, name, text, IView, Bounding} from "@nutriadoc/classes";
import {create} from "../../index.ts";
type ImageArgs = {

}

function inspect() {
  const bounding = new Bounding()
  const image = document.querySelector("img")!
  const ancestors = bounding.ancestors(image)
  console.debug(ancestors.map(it => ({node: it, offsetLeft: it.offsetLeft})))

  // image.addEventListener('mousemove', (e) => {
  //   const directions = bounding.isReachedTheEdge(e, image)
  //   // console.debug(directions)
  // })
}

const meta = {
  title: 'Misc/BoundingStories',
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
          }),
          text("placeholder")
        ),
        div(
          name("root"),
          style({
          })
        ),
      )
    )

    const doc = create(root.find(name("root")) as IView)

    doc.insertText(0, "Image")
    doc.insertEmbed(doc.getLength() - 1, "image", 'https://placehold.co/300x200')
    doc.insertEmbed(doc.getLength(), "image", 'https://placehold.co/300x200')

    setTimeout(inspect, 100)

    return root.render() as Node
  },
  argTypes: {},
} satisfies Meta<ImageArgs>;

export default meta;
type Story = StoryObj<ImageArgs>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const BoundingStories: Story = {
  args: {
  },
}


