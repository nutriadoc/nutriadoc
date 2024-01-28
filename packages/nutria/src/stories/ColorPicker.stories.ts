import type {StoryObj, Meta} from '@storybook/html'
import {default as ColorPickerComponent} from "../ui/color_picker/ColorPicker.ts";

// TODO: https://coloris.js.org/

const meta = {
  title: 'Editor/ColorPicker',
  tags: [],
  render: () => {

    const root = document.createElement("div")
    root.className = "root"

    const picker = new ColorPickerComponent()
    picker.addTo(root)

    return root
  },
  argTypes: {},
} satisfies Meta;

export default meta;
type Story = StoryObj;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const ColorPicker: Story = {
  args: {},
}


