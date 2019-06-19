import './style.scss';
import BaseScripts from 'scripts/base';
import getConnectionType from 'scripts/connection';
import { mark } from 'scripts/logger';

new BaseScripts();
const $ = document.querySelector;
const codeBlock = $('.article .highlight');
const footnotes = $('a.footnote-reference');

if (codeBlock) {
  const observer = new IntersectionObserver(
    (entries, observer) => {
      observer.unobserve(entries[0].target);

      import(/* webpackChunkName: "pygments-css" */ 'styles/pygment.scss');

      if (getConnectionType() === '4g') {
        import(/* webpackChunkName: "webfontloader" */ 'webfontloader')
          .then(WebFontLoader => {
            WebFontLoader.load({
              timeout: 3000,
              google: {
                families: ['Fira Mono:400&display=swap']
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

  observer.observe(codeBlock);
}

if (footnotes) {
  mark('tooltip').start();
  import(/* webpackChunkName "tooltip" */ 'scripts/tooltip')
    .then((Tooltip) => {
      new Tooltip.default($('.article__body'));
      mark('tooltip').end();
    });
}
