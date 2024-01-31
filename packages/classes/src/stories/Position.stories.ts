import type {Meta, StoryObj} from '@storybook/html'
import { div, style} from "../ui";

const meta: Meta = {
  title: 'Position',
  tags: [],
}

export default meta;
type Story = StoryObj

export const Absolute: Story = {
  render() {
    return div(
      div(
        style({
          width: "100px",
          height: "100px"
        })
      ),
      div(
        div(
          style({
            width: "100px",
            height: "100px",
            backgroundColor: "red",
          })
        ),
        div(
          style({
            width: "100px",
            height: "100px",
            backgroundColor: "green",
            position: "absolute",
            left: "0px",
            top: "0px",
          })
        )
      )
    ).render() as Node
  }
}

export const AbsoluteAndParentPositioned: Story = {
  render() {
    return div(
      div(
        style({
          padding: "20px",
        }),
        div(
          style({
            width: "100px",
            height: "100px",
          })
        ),
        div(
          style({
            "padding": "20px",
            position: "relative",
          }),
          div(
            style({
              width: "100px",
              height: "100px",
              backgroundColor: "red",
            })
          ),
          div(
            style({
              width: "100px",
              height: "100px",
              backgroundColor: "green",
              position: "absolute",
              left: "0px",
              top: "0px",
            })
          )
        )
      )
    ).render() as Node
  }
}


export const AbsoluteAndParentOfParentPositioned: Story = {
  render() {
    return div(
      div(
        style({
          padding: "20px",
          position: "relative",
        }),
        div(
          style({
            width: "100px",
            height: "100px",
          })
        ),
        div(
          style({
            "padding": "20px"
          }),
          div(
            style({
              width: "100px",
              height: "100px",
              backgroundColor: "red",
            })
          ),
          div(
            style({
              width: "100px",
              height: "100px",
              backgroundColor: "green",
              position: "absolute",
              left: "0px",
              top: "0px",
            })
          )
        )
      )
    ).render() as Node
  }
}
