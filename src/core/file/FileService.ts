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
}