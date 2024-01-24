enum DocumentCommandType {
  Unknown,
  Undo,
  Redo,
  Typing = 35,
  SelectImage,
  SelectVideo,
  SelectAttachment
}

export default DocumentCommandType