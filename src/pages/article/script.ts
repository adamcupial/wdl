import './style.scss';
import BaseScripts from 'scripts/base';
import getConnectionType from 'scripts/connection';
import { mark } from 'scripts/logger';

new BaseScripts();
const codeBlock = document.querySelector('.article .highlight');
const footnotes = document.querySelector('a.footnote-reference');

if (codeBlock) {
  const obs = new IntersectionObserver(
    (entries, observer) => {
      observer.unobserve(entries[0].target);

      import(/* webpackChunkName: "pygments-css" */ 'styles/pygment.scss');
      if (getConnectionType() === '4g') {
        import(/* webpackChunkName: "webfontloader" */ 'webfontloader')
        .then(WebFontLoader => {
          WebFontLoader.load({
            timeout: 3000,
            google: {
              families: ['Fira Mono:400']
            },
          })
        });
      }
    },
    {
      rootMargin: "50px 0px",
      threshold: 0.01,
    }
  );

  obs.observe(codeBlock);
}

if (footnotes) {
  mark('tooltip').start();
  import(/* webpackChunkName "tooltip" */ 'scripts/tooltip')
    .then((Tooltip) => {
      new Tooltip.default(document.querySelector('.article__body'));
      mark('tooltip').end();
    });
}
