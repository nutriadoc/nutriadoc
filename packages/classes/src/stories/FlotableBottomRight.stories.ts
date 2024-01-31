import type {Meta, StoryObj} from '@storybook/html'
import {div, FloatingView as FloatingComponent, Position, style, text, View} from "../ui";


interface FloatableArgs {

  hasRelative: boolean

  position: Position

  relativePositionX: "left" | "end" | "center"

  relativePositionY: "top" | "end" | "center"
}

const meta: Meta<FloatableArgs> = {
  title: 'Floating/BottomRight',
  tags: ['autodocs'],
  render: (args) => {
    const login = div(text("Login"))

    const floating = new FloatingComponent(
      args.position,
      [div(text("float"))]
    ).assignUnits(style({ width: "300px", backgroundColor: "#EFEFEF"})) as FloatingComponent

    setTimeout(() => {
      floating.visible(login as View)
    }, 100)

    const container = div(
      style({
        display: "flex",
        flex: 1,
        height: "100%",
        justifyContent: args.relativePositionX,
        alignItems: args.relativePositionY,
      }),
      div(
        div(
          style({
            position: "relative",
          }),
          login,
        )
      )
    )

    return container.render() as Node
  },
  argTypes: {
    hasRelative: {
      control: {
        type: 'boolean',
      },
    },
    relativePositionX: {
      control: {
        type: 'radio',
        options: ["left", "right", "center"],
      },
    },
    relativePositionY: {
      control: {
        type: 'inline-radio',
        options: ["top", "bottom", "center"],
      },
    },
  },
}

export default meta;
type Story = StoryObj<FloatableArgs>


export const Center: Story = {
  args: {
    hasRelative: true,
    position: Position.RightTop,
    relativePositionX: "center",
    relativePositionY: "center",
  },
}

export const LeftTop: Story = {
  args: {
    hasRelative: true,
    relativePositionX: "left",
    relativePositionY: "top",
    position: Position.BottomRight
  },
}

export const LeftCenter: Story = {
  args: {
    hasRelative: true,
    relativePositionX: "left",
    relativePositionY: "center",
    position: Position.BottomRight
  },
}

export const LeftBottom: Story = {
  args: {
    hasRelative: true,
    relativePositionX: "left",
    relativePositionY: "end",
    position: Position.BottomRight
  },
}

export const BottomCenter: Story = {
  args: {
    hasRelative: true,
    relativePositionX: "center",
    relativePositionY: "end",
    position: Position.BottomRight
  },
}

export const BottomRight: Story = {
  args: {
    hasRelative: true,
    relativePositionX: "end",
    relativePositionY: "end",
    position: Position.BottomRight
  },
}

export const RightCenter: Story = {
  args: {
    hasRelative: true,
    relativePositionX: "end",
    relativePositionY: "center",
    position: Position.BottomRight
  },
}

export const RightTop: Story = {
  args: {
    hasRelative: true,
    relativePositionX: "end",
    relativePositionY: "top",
    position: Position.BottomRight
  },
}

export const TopCenter: Story = {
  args: {
    hasRelative: true,
    relativePositionX: "center",
    relativePositionY: "top",
    position: Position.BottomRight
  },
}