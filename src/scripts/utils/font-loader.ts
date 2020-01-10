export default class FontLoader {
  private _family : string;
  private _name : string;

  constructor (family : string) {
    this._family = family;
    this._name = this._family.split(':')[0].replace(' ', '-').toLowerCase();
    this.createPreconnectLink();
    this.createPreloadLink();
  }

  private createPreconnectLink() {
    if (!document.querySelector('link[rel="preconnect"][href="https://fonts.gstatic.com/"]')) {
      const link = document.createElement('link');
      link.rel = 'preconnect';
      link.href = 'https://fonts.gstatic.com';
      document.head.insertBefore(
        link, document.head.childNodes[document.head.childNodes.length - 1].nextSibling,
      );
    }
  }

  private createPreloadLink() {
    const url = `https://fonts.googleapis.com/css?family=${encodeURIComponent(this._family)}&display=swap`; // tslint:disable-line max-line-length

    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = url;
    link.as = 'style';
    link.addEventListener('load', ({ target }) => {
      if (target instanceof HTMLLinkElement) {
        target.rel = 'stylesheet';
        document.documentElement.classList.add(`font-${this._name}-loaded`);
      }
    });

    document.head.insertBefore(
      link, document.head.childNodes[document.head.childNodes.length - 1].nextSibling,
    );
  }
}
