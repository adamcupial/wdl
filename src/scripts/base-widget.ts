export default class BaseWidget {
  context: HTMLElement
  settings: object

  constructor(context, settings) {
    this.context = context;
    this.settings = settings;
    this.render();
  }

  render() {
  }
}
