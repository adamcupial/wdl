import 'styles/tooltip.scss';

class Tip {
  tipContainer: HTMLElement | null;
  target: HTMLElement;
  text: string;

  constructor(node : HTMLElement, text : string) {
    this.tipContainer = document.getElementById('tipContainer');
    this.target = node;
    this.text = text;

    if (!this.tipContainer) {
      const el = document.createElement('div');

      el.id = 'tipContainer';
      el.classList.add('tooltip');
      document.body.appendChild(el);
      this.tipContainer = el;
    }

    this.show();
  }

  show() {
    window.requestAnimationFrame(() => {
      const { x, y, left, top } = this.target.getBoundingClientRect();

      if (this.tipContainer) {
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
      }
    });
  }

  destroy() {
    window.requestAnimationFrame(() => {
      if (this.tipContainer) {
        this.tipContainer.classList.remove('tooltip--visible');
        this.tipContainer.classList.remove('tooltip--left');
        this.tipContainer.innerHTML = '';
      }
    });
  }
}

export default class Tooltip {
  context: HTMLElement;

  constructor(context = document.body) {
    this.context = context;

    this.context.addEventListener(
      'mouseover',
      ({ target }) => {
        if (target instanceof HTMLElement && target.classList.contains('footnote-ref')) {
          const parent = document.getElementById(target.getAttribute('href').slice(1));

          if (parent) {
            const tip = new Tip(target, parent.innerHTML);

            target.addEventListener(
              'mouseout',
              function onMouseOut() {
                tip.destroy();
                target.removeEventListener('mouseout', onMouseOut, false);
              },
              false);
          }
        }

      },
      false);
  }
}
