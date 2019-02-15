import './style.scss';
import BaseWidget from 'scripts/base-widget';
import { library, dom, config } from '@fortawesome/fontawesome-svg-core';
import { faSearch, faBars } from '@fortawesome/free-solid-svg-icons'
import { faPython, faCss3Alt, faJs, faHtml5 } from '@fortawesome/free-brands-svg-icons'


export default class HeaderWidget extends BaseWidget {
  private loadSVG () : void {
    config.autoAddCss = false;
    library.add(faHtml5, faPython, faCss3Alt, faJs, faSearch, faBars);
    dom.i2svg({
      node: this.context as Node,
      callback: () => {},
    });
  }

  render() : void {
    this.context
    .querySelector('.navigation-button')
    .addEventListener('click', (ev:Event) => {
      const target = ev.currentTarget as HTMLElement;

      target.classList.toggle('active');
      document.documentElement.classList.toggle('no-scroll');
    }, false);
    this.loadSVG();
  }
}
