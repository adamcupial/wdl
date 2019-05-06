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
    window.requestAnimationFrame(_ => {
      const { x, y, left, top } = this.target.getBoundingClientRect();

      this.tipContainer.innerHTML = this.text;
      this.tipContainer.style.left = `${left + window.scrollX}px`;
      this.tipContainer.style.top = `${top + window.scrollY}px`;
      this.tipContainer.style.maxWidth = `${window.innerWidth - x - 100}px`;

      if (x / window.innerWidth > .5) {
        this.tipContainer.classList.add('tooltip--left');
        this.tipContainer.style.maxWidth = `${x - 100}px`;
      }

      if (y / window.innerHeight > .5) {
        this.tipContainer.classList.add('tooltip--top');
      }

      this.tipContainer.classList.add('tooltip--visible');
    });
  }

  destroy() {
    window.requestAnimationFrame(_ => {
      this.tipContainer.classList.remove('tooltip--visible');
      this.tipContainer.classList.remove('tooltip--left');
      this.tipContainer.innerHTML = '';
    });
  }
}

export default class Tooltip {
  context: HTMLElement;

  constructor(context=document.body) {
    this.context = context;

    this.context.addEventListener('mouseover', ({ target }) => {
      if (target.classList.contains('footnote-reference')) {
        const text = document.getElementById(
          target.getAttribute('href').slice(1)
        )
          .querySelector('td:not(.label)')
          .innerHTML;

        const tip = new Tip(target, text);

        target.addEventListener('mouseout', function onMouseOut () {
          tip.destroy();
          target.removeEventListener('mouseout', onMouseOut, false);
        }, false);
      }

    }, false);
  }
}
