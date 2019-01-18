import './style.scss';
import BaseWidget from 'scripts/base-widget';
import { library, dom } from '@fortawesome/fontawesome-svg-core';
import { faSearch, faBars } from '@fortawesome/free-solid-svg-icons'
import { faPython, faCss3Alt, faJs, faHtml5 } from '@fortawesome/free-brands-svg-icons'


export default class HeaderWidget extends BaseWidget {
  render() {
    this.context
    .querySelector('.navigation-button')
    .addEventListener('click', (ev:Event) => {
      ev.currentTarget.classList.toggle('active');
      document.documentElement.classList.toggle('no-scroll');
    }, false)

    this.context
      .addEventListener('click', (ev:Event) => {
        if (ev.target.classList.contains('fa-search')) {
          const form = this.context.querySelector('.form');
          if (form.classList.contains('visible')) {
            form.querySelector('form input[type="submit"]').click();
          } else {
            form.classList.add('visible')
            form.querySelector('input[name="q"]').focus();
          }
        }
      });

    library.add(faHtml5, faPython, faCss3Alt, faJs, faSearch, faBars);

    dom.i2svg({ node: this.context });
  }
}
