import type {StoryObj, Meta} from '@storybook/html'
import {className, div, style, text} from "../../ui/views.ts";

const meta = {
  title: 'Misc/ContainerSize',
  tags: [],
  render: () => {

    const root = div(
      style({
        height: "100%",
        position: "relative",
      }),
      div(
        style({
          height: "1000px",
          padding: "10px",
          margin: "10px",
          border: "10px solid #000"
        })
      ),
      div(
        className("container"),
        style({
          position: "absolute",
          // top: "0"
        }),
        div(
          className("toolbar"),
          text("toolbar"),
          style({
            position: "absolute",
          })
        ),
      ),

      div(
        className("text"),
        style({
          width: "100px",
          height: "100px",
          position: "relative",
        }),
        div(
          style({
            height: "20px"
          })
        ),
        div(
          className("text1"),
          style({
            padding: "10px",
            margin: "10px",
            border: "10px solid #000",
            height: "20px",
          }),
          text("Text1")
        )
      ),
    )

    const observer = new ResizeObserver(_ => {
      const textC = root.find(className("text"))!
      const text = textC.find(className("text1"))!
      const container = root.find(className("container"))!
      const toolbar = container.find(className("toolbar"))!
      const toolbarRect = toolbar.element.getBoundingClientRect()
      const textY = text.element.offsetTop

      toolbar.assignUnits(style({
        top: `${textY - toolbarRect.height}px`,
        left: `${text.element.offsetLeft}px`
      }))

      text.element.scrollIntoView()
    })
    observer.observe(root.element)

    return root.render() as Node
  },
  argTypes: {},
} satisfies Meta;

export default meta;
type Story = StoryObj;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const ContainerSize: Story = {
  args: {},
}


