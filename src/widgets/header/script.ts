import './style.scss';
import BaseWidget from 'scripts/components/widget';


export default class HeaderWidget extends BaseWidget {
  render() : void {
    this.context
      .querySelector('.navigation-button')
      .addEventListener('click', ({ currentTarget }) => {
        currentTarget.classList.toggle('active');
        document.documentElement.classList.toggle('no-scroll');
      }, false);
  }
}
