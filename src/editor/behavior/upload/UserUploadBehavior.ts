import UploadTask from "../../../ui/upload/UploadTask.ts";

export default interface UserUploadBehavior {

  userLoadDocument(): Promise<void>

  selectImageFile(): void

  userUploadAnImage(file: File, editorIndex: number): Promise<void>

  userUploadImages(file: File[], editorIndex: number): Promise<void>

  feedbackToUserAboutUploads(keys: string[]): void

  userHasSelectedAnImageThatAreCurrentlyUploading(): void

  imageLosesTheFocus(key: string): void

  uploadsHasFailed(upload: UploadTask): void

  uploadsHasSucceeded(upload: UploadTask): void

}