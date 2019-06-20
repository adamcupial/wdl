import HeaderWidget from 'widgets/header/script';
import getConnectionType from 'scripts/connection';
import TimeChanger from 'scripts/timechange';

export default class BaseScripts {
  observer: IntersectionObserver;

  constructor() {
    const nativeLazyLoading = ('loading' in HTMLImageElement.prototype);

    this.observer = new IntersectionObserver(
      (entries, observer) => {
        this.processObserver(entries, observer);
      },
      {
        rootMargin: "100px 0px",
        threshold: 0.01,
      }
    );

    [...document.querySelectorAll('[data-module]')]
      .forEach((el) => {
        if (el.dataset.lazy) {
          this.observer.observe(el);
        } else {
          this.loadModule(el);
        }
      });

      [...document.querySelectorAll('[loading="lazy"]')]
        .forEach((el) => {
        if (nativeLazyLoading) {
          this.loadImage(el);
        } else {
          this.observer.observe(el);
        }
        });

        new TimeChanger();
  }

  private loadModule(node: HTMLElement) : void {
    const moduleName = node.dataset.module;

    import(`widgets/${moduleName}/script`)
      .then((widget) => {
        new widget.default(node);
      });
  }

  private loadImage(node: HTMLImageElement) : void {
    if (node.parentElement.tagName.toLowerCase() === 'picture') {
      [...node.parentElement.querySelectorAll('source')]
      .forEach((source) => {
        source.srcset = source.dataset.srcset;
        delete source.dataset.srcset;
      });
    }
    node.src = node.dataset.src;
    delete node.dataset.src;
  }

  processObserver(entries, observer) {
    entries
      .filter(entry => entry.isIntersecting)
      .forEach(({ target }) => {
        if (target.dataset.module) {
          this.loadModule(target);
        } else if (target.hasAttribute('loading')) {
          this.loadImage(target);
        } else {
          throw new Error('UnexpectedType: not a module nor image');
        }

        observer.unobserve(target);
      });
  }
}
