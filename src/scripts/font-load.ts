export default class FontLoader {
  private __family : string;
  private __name : string;

  constructor (family : string) {
    this.__family = family;
    this.__name = this.__family.split(':')[0].replace(' ', '-').toLowerCase();
    this.createPreconnectLink();
    this.createPreloadLink();
  }

  private createPreconnectLink() {
    if (!document.querySelector('link[rel="preconnect"][href="https://fonts.gstatic.com/"]')) {
      const link = document.createElement('link');
      link.rel = 'preconnect';
      link.href = 'https://fonts.gstatic.com';
      document.head.insertBefore( link, document.head.childNodes[ document.head.childNodes.length - 1 ].nextSibling );
    }
  }

  private createPreloadLink() {
    const url = `https://fonts.googleapis.com/css?family=${encodeURIComponent(this.__family)}&display=swap`;

    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = url;
    link.as = 'style';
    link.addEventListener('load', ({ target }) => {
      target.rel = 'stylesheet';
      document.documentElement.classList.add(`font-${this.__name}-loaded`);
    });

    document.head.insertBefore( link, document.head.childNodes[ document.head.childNodes.length - 1 ].nextSibling );
  }
}
