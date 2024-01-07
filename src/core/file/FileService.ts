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

  static fromBase64<T extends Blob | File>(base64: string, toFile: boolean = false): T {

    let [type, data] = base64.split(",")
    const bytes = atob(data);
    const ab = new ArrayBuffer(bytes.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < bytes.length; i++) {
      ia[i] = bytes.charCodeAt(i);
    }

    const [mime] = type.split(";")
    type = mime.split(":")[1].split("/")[1]

    const blob = new Blob([ab], {type});

    if (!toFile) return blob as unknown as T
    return new File([blob], 'noname', {type}) as unknown as T
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