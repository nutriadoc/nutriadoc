import type { StoryObj, Meta } from '@storybook/html'
import {button, delay, div, FileService, id, IView, onClick, text, View} from "@nutriadoc/classes"
import AttachmentView from "../../attachment/AttachmentView"
// @ts-ignore
import { default as Logo } from "./logo.base64?raw"


const onUploadImageClick = (container: IView) => {
  const file = FileService.fromBase64<File>(Logo, `logo.png`)
  const attachment = new AttachmentView(file)

  const updateProgress = async () => {
    for (let i = 0; i < 100; i++) {
      await delay(10)
      attachment.progress(i / 100.0)
    }
    attachment.completed()
  }
  updateProgress().then(() => {})
  container.find(id("container"))?.add(attachment)
}

const meta: Meta = {
  title: 'Attachment',
  tags: [],
  render: (args) => {
    const file = new File([""], "filename")



    const root = div(
      button(
        text("Upload image"),
        onClick(() => { onUploadImageClick(root) })
      ),
      div(id("container"))
    )

    return root.renderNode()
  }
}

export default meta;
type Story = StoryObj;

export const Image: Story = {
  args: {
    isPrimaryButton: true,
    loading: false,
  },
}