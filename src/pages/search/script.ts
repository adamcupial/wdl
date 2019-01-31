import './style.scss';
import { html, render } from 'lit-html';
import { repeat } from 'lit-html/directives/repeat';
import BaseScripts from 'scripts/base';
import SearchIndex from 'scripts/search';

const searchForm = document.getElementById('search-form') as HTMLFormElement;
const searchResults = document.querySelector('.search-results .content');
const searchParams = new URLSearchParams(window.location.search);
const sIdx = new SearchIndex();

const resultTemplate = (results) => {
  let res = null;
  if (results.length) {
    res = results.map((result) => html`
      <li data-ref="${result.ref}">
        <a href="${result.data.url}">${result.data.title}</a>
      </li>
    `);
  } else {
    res = html`<li class="empty">No articles found matching the query</li>`;
  }
  return html`<ul>${res}</ul>`;
};

function search(query: string) : void {
  window.history.replaceState({}, document.title, `${window.location.pathname}?q=${query}`);

  sIdx
    .search(query)
    .then((results) => {
      render(resultTemplate(results), searchResults);
    });
}

new BaseScripts();

if (searchParams.has('q')) {
  const query = searchParams.get('q');
  searchForm.elements.q.value = query;
  search(query);
}

searchForm.addEventListener('submit', (ev) => {
  ev.preventDefault();
  const form = ev.currentTarget as HTMLFormElement;
  search(form.elements.q.value);
  return false;
});
