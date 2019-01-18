import HeaderWidget from 'widgets/header/script';
import getConnectionType from 'scripts/connection';
import TimeChanger from 'scripts/timechange';

export default class BaseScripts {
  observer: IntersectionObserver;

  constructor() {
    const intObsOptions = {
      rootMargin: "100px 0px",
      threshold: 0.01,
    };
    this.loadBaseWidgets();
    this.loadFonts();
    this.transformTimes();
    this.observer = new IntersectionObserver(
      (entries, observer) => {
        this.processObserver(entries, observer);
      },
      intObsOptions
    );
    this.lazyLoadImages();
    this.delayedLoadBaseWidgets();
  }

  processObserver(entries, observer) {
    entries
    .filter(entry => entry.isIntersecting)
    .forEach((entry) => {
      const data = entry.target.dataset;

      if (data.module) {
        if (data.moduleStyleOnly) {
          import(`widgets/${data.module}/style.scss`);
        } else {
          import(`widgets/${data.module}/script`)
          .then((widget) => {
            new widget.default(entry.target);
          });
        }
      } else if (data.lazySrc) {
        entry.target.src = data.lazySrc;
        delete data.lazySrc;
      }

      observer.unobserve(entry.target);
    });
  }

  loadBaseWidgets() {
    new HeaderWidget(document.querySelector('[data-module="header"]'), {});
  }

  delayedLoadBaseWidgets() {
    [
      'footer',
      'paginator',
      'taglist',
    ]
    .map(name => `[data-module="${name}"]`)
    .map(selector => document.querySelector(selector))
    .filter(el => !!el)
    .forEach((el) => {
      this.observer.observe(el);
    });
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

  lazyLoadImages() {
    document.querySelectorAll('[data-lazy-src]')
      .forEach((el) => { this.observer.observe(el); });
  }

  transformTimes() {
    new TimeChanger();
  }
}
