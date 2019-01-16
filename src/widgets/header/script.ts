import './style.scss';
import { library, dom } from '@fortawesome/fontawesome-svg-core';
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { faPython, faCss3Alt, faJs, faHtml5 } from '@fortawesome/free-brands-svg-icons'


export default class HeaderWidget {
  context: HTMLElement
  settings: object

  constructor(context, settings) {
    this.context = context;
    this.settings = settings;
    this.render();
  }

  render() {
    library.add(faHtml5, faPython, faCss3Alt, faJs, faSearch);
    dom.watch();
  }
}
