import { log, mark, group, groupEnd, error } from './logger';

export default class BaseWidget {
  context: HTMLElement;
  __settings: object;
  __name: string;

  private get name () : string {
    if (this.__name) {
      return this.__name;
    }

    if (this.context.dataset && this.context.dataset.module) {
      this.__name = `${this.context.dataset.module}Widget`;
    } else {
      this.__name = `${Math.random().toString(36).substr(2, 9)}Widget`;
    }

    return this.__name;
  }

  get settings () : object {
    if (this.__settings) {
      return this.__settings;
    }

    if (this.context.dataset && this.context.dataset.settings) {
      this.__settings = JSON.parse(this.context.dataset.settings);
    } else {
      this. __settings = {};
    }

    return this.__settings;
  }

  constructor(context) {
    this.context = context;

    group(`${this.name}`);
    mark(`${this.name}`).start();
    log(`${this.name} widget initialized with settings`, this.settings);
    this.render();
    mark(`${this.name}`).end();

    if (window.performance) {
      const meas = window.performance.getEntriesByName(`${this.name}`, 'measure')[0];
      log(`${this.name} widget rendered in `, meas.duration);
    }

    groupEnd();
  }

  render() : void {
    error('NotImplementedError');
  }
}
