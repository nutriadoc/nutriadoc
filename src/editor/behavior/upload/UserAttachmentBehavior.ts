import UploadTask from "../../../ui/upload/UploadTask.ts";
import DocumentCommandType from "../../../document/commands/DocumentCommandType.ts";

export default interface UserAttachmentBehavior {


  selectFile(type: DocumentCommandType): void

  uploadAnImage(file: File, editorIndex: number, type: DocumentCommandType): Promise<void>

  uploadImages(file: File[], editorIndex: number, type: DocumentCommandType): Promise<void>

  feedbackToUserAboutUploads(keys: string[]): void

  userHasSelectedAnAttachmentThatAreCurrentlyUploading(): void

  attachmentLosesTheFocus(key: string): void

  uploadsHasFailed(upload: UploadTask): void

  uploadsHasSucceeded(upload: UploadTask): void

}