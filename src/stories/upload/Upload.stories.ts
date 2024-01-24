import type {Meta, StoryObj} from '@storybook/html'
import {create} from "../../index.ts"
import { default as Logo } from "./logo.base64?raw"
import { default as Video } from "./video.base64?raw"
import FileService from "../../core/file/FileService.ts";

type UploadArgs = {
  files: File[]
}

const meta = {
  title: 'Upload/Upload',
  tags: [],
  render: (args: UploadArgs) => {
  
    const root = create()

    root.addEventListener('ready', async () => {
      await root.behavior.upload.uploadFiles(args.files, 0).then(() => {})
      console.debug(root.editor.contents)
    })

    return root.render() as Node
  },
  argTypes: {},
} satisfies Meta<UploadArgs>;

export default meta;
type Story = StoryObj<UploadArgs>;

export const User: Story = {
  args: {
    files: [],
  },
}

export const UploadSingle: Story = {
  args: {
    files: [
      FileService.fromBase64<File>(Logo, `logo.png`)
    ]
  },
}

export const UploadMultiple: Story = {
  args: {
    files: [
      FileService.fromBase64<File>(Logo, `logo.png`),
      FileService.fromBase64<File>(Logo, `logo.png`)
    ]
  },
}

export const UploadVideo: Story ={
  args: {
    files: [
      FileService.fromBase64<File>(Video, `_video.mp4`)
    ]
  }
}

export const UploadAttachment: Story = {
  args: {
    files: [
      new File(['test'],  'test.txt', { type: "text/plain" })
    ]
  }
}
