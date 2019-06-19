import { log, mark, group, groupEnd, error } from './logger';

export default class BaseWidget {
  context: HTMLElement;
  __name: string;

  private get name () : string {
    if (!this.__name) {
      if (this.context.dataset && this.context.dataset.module) {
        this.__name = `${this.context.dataset.module}Widget`;
      } else {
        this.__name = `${Math.random().toString(36).substr(2, 9)}Widget`;
      }
    }

    return this.__name;
  }

  constructor(context: HTMLElement) {
    this.context = context;

    group(`${this.name}`);
    mark(`${this.name}`).start();
    log(`${this.name} widget initialized`);
    this.render();
    mark(`${this.name}`).end();

    if (window.performance) {
      const meas = window.performance.getEntriesByName(`${this.name}`, 'measure')[0];
      log(`${this.name} widget rendered in `, meas.duration);
    }

    groupEnd();
  }

  render() : void {
  }
}
