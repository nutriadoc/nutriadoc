export default class Load {

  static loadCSS(url: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const link = document.createElement('link')
      link.href = url
      link.rel = 'stylesheet'

      link.onload = () => {
        resolve()
      }

      link.onerror = () => {
        reject(new Error(`Failed to load CSS: ${url}`))
      }

      document.head.appendChild(link)
    })
  }
}