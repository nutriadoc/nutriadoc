export default class Page {
  static setup() {
    const viewport = document.querySelector('meta[name="viewport"]')
    viewport?.setAttribute('content', 'width=deviceWidth, initial-scale=1.0');
  }
}