import TimeChanger from 'scripts/timechange';

const nativeLazyLoading = ('loading' in HTMLImageElement.prototype);
const observer = new IntersectionObserver(
  (entries, observer) => {
    processObserver(entries, observer);
  },
  {
    rootMargin: '100px 0px',
    threshold: 0.01,
  },
);

registerSW();

Array.from(document.querySelectorAll('[data-module]'))
.forEach((el) => {
  if (el instanceof HTMLElement) {
    if (el.dataset.lazy) {
      observer.observe(el);
    } else {
      loadModule(el);
    }
  }
});

Array.from(document.querySelectorAll('[loading="lazy"]'))
.forEach((el) => {
  if (el instanceof HTMLImageElement) {
    if (nativeLazyLoading) {
      loadImage(el);
    } else {
      observer.observe(el);
    }
  }
});

new TimeChanger();

function registerSW() : void {
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

function loadModule(node: HTMLElement) : void {
  import(/* webpackPrefetch: true */ `widgets/${node.dataset.module}/script`) // tslint:disable-line space-in-parens max-line-length
  .then((widget) => {
    new widget.default(node);
  });
}

function loadImage(node: HTMLImageElement) : void {
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

function processObserver(entries : IntersectionObserverEntry[], observer : IntersectionObserver) {
  entries
  .filter(entry => entry.isIntersecting)
  .forEach(({ target }) => {
    if (target instanceof HTMLImageElement) {
      loadImage(target);
    } else if (target instanceof HTMLElement) {
      loadModule(target);
    } else {
      throw new Error('UnexpectedType: not a module nor image');
    }

    observer.unobserve(target);
  });
}
