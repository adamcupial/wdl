import './style.scss';
import BaseScripts from 'scripts/base';
import getConnectionType from 'scripts/connection';
import { mark } from 'scripts/logger';

new BaseScripts();
const codeBlock = document.querySelector('.article .highlight');

if (codeBlock) {
  const observer = new IntersectionObserver(
    (entries, observer) => {
      observer.unobserve(entries[0].target);

      import(/* webpackChunkName: "pygments-css" */ 'styles/pygment.scss');

      if (getConnectionType() === '4g') {
        import('scripts/font-load')
          .then(loader => {
            new loader.default('Fira Mono:400')
          });
      }
    },
    {
      rootMargin: "50px 0px",
      threshold: 0.01,
    }
  );

  observer.observe(codeBlock);
}

if (document.querySelector('a.footnote-reference')) {
  mark('tooltip').start();
  import(/* webpackChunkName "tooltip" */ 'scripts/tooltip')
    .then((Tooltip) => {
      new Tooltip.default(document.querySelector('.article__body'));
      mark('tooltip').end();
    });
}
