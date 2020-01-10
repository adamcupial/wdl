import './style.scss';
import getConnectionType from 'scripts/connection';

const codeBlock = document.querySelector('.article .highlight');

if (codeBlock) {
  const observer = new IntersectionObserver(
    (entries, observer) => {
      observer.unobserve(entries[0].target);

      import(/* webpackChunkName: "pygments-css" */ 'styles/pygment.scss'); // tslint:disable-line space-in-parens max-line-length

      if (getConnectionType() === '4g') {
        import('scripts/font-load')
          .then((loader) => {
            new loader.default('Fira Mono:400');
          });
      }
    },
    {
      rootMargin: '50px 0px',
      threshold: 0.01,
    },
  );

  observer.observe(codeBlock);
}

const articleBody = document.querySelector('.article__body');

if (document.querySelector('a.footnote-ref') && articleBody instanceof HTMLElement) { // tslint:disable-line max-line-length
  import(/* webpackChunkName "tooltip" */ 'scripts/tooltip') // tslint:disable-line space-in-parens max-line-length
  .then((Tooltip) => {
    new Tooltip.default(articleBody);
  });
}
