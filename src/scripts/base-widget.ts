import { log, mark } from './logger';

export default class BaseWidget {
  context: HTMLElement;
  settings: object;
  widgetName: string;

  constructor(context, settings) {
    this.widgetName = 'unknown';

    if (context.dataset && context.dataset.module) {
      this.widgetName = `${context.dataset.module}Widget`;
    }
    mark(`${this.widgetName}__init`).start();
    log(`${this.widgetName} widget created`);
    this.context = context;
    this.settings = settings;
    this.render();
    mark(`${this.widgetName}__init`).end();
  }

  render() {
  }
}
