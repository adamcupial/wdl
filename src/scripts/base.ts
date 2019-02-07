import HeaderWidget from 'widgets/header/script';
import getConnectionType from 'scripts/connection';
import TimeChanger from 'scripts/timechange';
import { log, group, groupEnd } from 'scripts/logger';

export default class BaseScripts {
  observer: IntersectionObserver;

  constructor() {
    const intObsOptions = {
      rootMargin: "100px 0px",
      threshold: 0.01,
    };
    this.observer = new IntersectionObserver(
      (entries, observer) => {
        this.processObserver(entries, observer);
      },
      intObsOptions
    );

    this.loadBaseWidgets();
    this.loadFonts();

    new TimeChanger();

    [
      'footer',
      'paginator',
      'taglist',
      'article-box',
    ]
      .map(name => `[data-module="${name}"]`)
      .map(selector => document.querySelector(selector))
      .filter(el => !!el)
      .forEach((el) => {
        this.observer.observe(el);
      });

    document.querySelectorAll('[data-lazy-src]')
      .forEach((el) => { this.observer.observe(el); });
  }

  private loadModule(node) {
    const moduleName = node.dataset.module;

    import(`widgets/${moduleName}/script`)
      .then((widget) => {
        new widget.default(node);
      });
  }

  private loadImage(node) {
    node.src = node.dataset.lazySrc;
    delete node.dataset.lazySrc;
  }

  processObserver(entries, observer) {
    entries
      .filter(entry => entry.isIntersecting)
      .forEach((entry) => {
        const data = entry.target.dataset;

        if (data.module) {
          this.loadModule(entry.target);
        } else if (data.lazySrc) {
          this.loadImage(entry.target);
        }

        observer.unobserve(entry.target);
      });
  }

  loadBaseWidgets() {
    new HeaderWidget(document.querySelector('[data-module="header"]'), {});
  }

  loadFonts() {
    if (['4g', '3g'].indexOf(getConnectionType()) !== -1) {
      import(/* webpackPreload: true, webpackChunkName: "webfontloader" */ 'webfontloader')
      .then(WebFontLoader => {
        WebFontLoader.load({
          timeout: 3000,
          google: {
            families: ['Open Sans:400,700']
          },
        })
      });
    }
  }
}
