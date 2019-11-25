export default class BaseScripts {
  observer: IntersectionObserver;

  constructor() {
    const nativeLazyLoading = ('loading' in HTMLImageElement.prototype);
    this.registerSW();

    this.observer = new IntersectionObserver(
      (entries, observer) => {
        this.processObserver(entries, observer);
      },
      {
        rootMargin: '100px 0px',
        threshold: 0.01,
      },
    );

    Array.from(document.querySelectorAll('[data-module]'))
      .forEach((el) => {
        if (el instanceof HTMLElement) {
          if (el.dataset.lazy) {
            this.observer.observe(el);
          } else {
            this.loadModule(el);
          }
        }
      });

    Array.from(document.querySelectorAll('[loading="lazy"]'))
      .forEach((el) => {
        if (el instanceof HTMLImageElement) {
          if (nativeLazyLoading) {
            this.loadImage(el);
          } else {
            this.observer.observe(el);
          }
        }
      });

    import(/* webpackChunkName: "timeChange" */ 'scripts/timechange') // tslint:disable-line space-in-parens max-line-length
      .then((module) => {
        new module.default();
      });
  }

  private registerSW() : void {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/theme/service-worker.js', {
          scope: '/',
        }).then((registration) => {
          console.log('SW registered: ', registration);
        }).catch((registrationError) => {
          console.log('SW registration failed: ', registrationError);
        });
      });
    }
  }

  private loadModule(node: HTMLElement) : void {
    import(/* webpackPrefetch: true */ `widgets/${node.dataset.module}/script`) // tslint:disable-line space-in-parens max-line-length
      .then((widget) => {
        new widget.default(node);
      });
  }

  private loadImage(node: HTMLImageElement) : void {
    if (node.parentElement && node.parentElement instanceof HTMLPictureElement) {
      Array.from(node.parentElement.querySelectorAll('source'))
        .forEach((source) => {
          source.srcset = source.dataset.srcset || '';
          delete source.dataset.srcset;
        });
    }
    node.src = node.dataset.src || '';
    delete node.dataset.src;
  }

  processObserver(entries : IntersectionObserverEntry[], observer : IntersectionObserver) {
    entries
      .filter(entry => entry.isIntersecting)
      .forEach(({ target }) => {
        if (target instanceof HTMLImageElement) {
          this.loadImage(target);
        } else if (target instanceof HTMLElement) {
          this.loadModule(target);
        } else {
          throw new Error('UnexpectedType: not a module nor image');
        }

        observer.unobserve(target);
      });
  }
}
