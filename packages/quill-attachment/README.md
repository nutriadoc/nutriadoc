# Quill Attachment

> In development

Quill Attachment is a module for Quill. Using this module, you can handle attachment functions more easily, not only Quill's built-in image upload, but also the upload and display of images, videos, audios, and files.

This module also provides progress prompts during upload, prompts after upload completion, and adjustments to the preview size of attachments.

## Features
- Supported attachment types
  - Image
  - Video
  - Audio
  - File
- Interface interaction
  - Drag and drop
  - Select files
  - Progress bar
  - Error handling


## Install
```shell
$ npm install --save quill-attachment
```

## Usage

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/quill-attachment/dist/quill-attachment.css">

<script src="https://cdn.jsdelivr.net/npm/quill-attachment/dist/quill-attachment.js"></script>
<script>
    const quill = new Quill("#editor", {
        modules: {
            type(fileType) {
                // ... type logic
              return ['image/png'].includes(fileType)
            },
            uploader: QuillAttachment.config({
              service(files: AttachmentState[]) {
                // report progress and complete
                state.progress(1024)
                state.completed()
              }
            })
        }
    })
</script>
```