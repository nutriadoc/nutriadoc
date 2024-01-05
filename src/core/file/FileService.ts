import BlobRef from "./BlobRef.ts";

export default class FileService {
  static async toBlob(file: File): Promise<Blob> {

    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsArrayBuffer(file)
      reader.onloadend = () => {
        if (reader.result == null) {
          reject(new Error("File is null"))
        } else {
          resolve(new Blob([reader.result], { type: file.type }))
        }
      }
      reader.onerror = () => {
        reject(reader.error)
      }
    })
  }

  static async toBlobRef(blob: Blob): Promise<BlobRef> {
    return URL.createObjectURL(blob)
  }

  static async base64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        resolve(e.target?.result as string)
      }

      reader.onerror = (e) => {
        reject(e)
      }

      reader.readAsDataURL(file)
    })

  }
}