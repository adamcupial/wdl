import 'styles/tooltip.scss';

class Tip {
  tipContainer: HTMLElement;
  target: HTMLElement;
  text: string;

  constructor(node, text) {
    this.tipContainer = document.getElementById('tipContainer');
    this.target = node;
    this.text = text;

    if (!this.tipContainer) {
      const el = document.createElement('div');
      el.id = 'tipContainer';
      el.classList.add('tooltip');
      document.body.appendChild(el);
      this.tipContainer = document.getElementById('tipContainer');
    }

    this.show();
  }

  show() {
    const rect = this.target.getBoundingClientRect();
    this.tipContainer.innerHTML = this.text;
    this.tipContainer.style.left = `${rect.left + window.scrollX}px`;
    this.tipContainer.style.top = `${rect.top + window.scrollY}px`;
    this.tipContainer.style.maxWidth = `${window.innerWidth - rect.x - 100}px`;

    if (rect.x / window.innerWidth > .5) {
      this.tipContainer.classList.add('tooltip--left');
      this.tipContainer.style.maxWidth = `${rect.x - 100}px`;
    }

    if (rect.y / window.innerHeight > .5) {
      this.tipContainer.classList.add('tooltip--top');
    }

    this.tipContainer.classList.add('tooltip--visible');
  }

  destroy() {
    this.tipContainer.classList.remove('tooltip--visible');
    this.tipContainer.classList.remove('tooltip--left');
    this.tipContainer.innerHTML = '';
  }
}

export default class Tooltip {
  context: HTMLElement;

  constructor(context=document.body) {
    this.context = context;

    this.context.addEventListener('mouseover', (ev: Event) => {
      const target = <HTMLElement>ev.target;

      if (target.classList.contains('footnote-reference')) {
        const text = document.getElementById(
          target.getAttribute('href').slice(1))
          .querySelector('td:not(.label)')
          .innerHTML;
        const tip = new Tip(ev.target, text);

        target.addEventListener('mouseout', function onMouseOut () {
          tip.destroy();
          target.removeEventListener('mouseout', onMouseOut, false);
        }, false);
      }

    }, false);
  }
}
