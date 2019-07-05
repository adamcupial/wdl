export default class BaseWidget {
  context: HTMLElement;
  name: string;

  constructor(context: HTMLElement) {
    this.context = context;

    if (this.context.dataset && this.context.dataset.module) {
      this.name = `${this.context.dataset.module}Widget`;
    } else {
      this.name = `${Math.random().toString(36).substr(2, 9)}Widget`;
    }

    this.render();
    this.context.dataset.loaded = 'true';
  }

  render() : void {
  }
}
