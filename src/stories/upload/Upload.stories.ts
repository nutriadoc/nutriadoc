import type {Meta, StoryObj} from '@storybook/html'
import {create} from "../../index.ts"
import { default as Logo } from "./logo.base64?raw"
import FileService from "../../core/file/FileService.ts";

type UploadArgs = {
  fileNumber: number
}

const meta = {
  title: 'Upload/Upload',
  tags: [],
  render: (args: UploadArgs) => {
    const files: File[] = []
    for (let i = 0, size = args.fileNumber; i < size; i++) {
      const file = FileService.fromBase64<File>(Logo, `${Math.random().toFixed(8)}_logo.png`)
      files.push(file)
    }

    const root = create()

    root.addEventListener('ready', () => {
      root.behavior.upload.userUploadImages(files, 0).then(() => {})
    })

    return root.render() as Node
  },
  argTypes: {},
} satisfies Meta<UploadArgs>;

export default meta;
type Story = StoryObj<UploadArgs>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args

export const User: Story = {
  args: {
    fileNumber: 0
  },
}

export const UploadSingle: Story = {
  args: {
    fileNumber: 1
  },
}

export const UploadMultiple: Story = {
  args: {
    fileNumber: 5
  },
}


