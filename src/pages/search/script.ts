import './style.scss';
import { html, render } from 'lit-html';
import { repeat } from 'lit-html/directives/repeat';
import BaseScripts from 'scripts/base';
import SearchIndex from 'scripts/search';

const searchForm = document.getElementById('search-form') as HTMLFormElement;
const queryField = searchForm.elements.q;
const searchResults = document.querySelector('.search-results__content');
const searchParams = new URLSearchParams(window.location.search);
const searchIndex = new SearchIndex();


const resultTemplate = (results) => {
  let res = null;
  if (results.length) {
    res = results.map((result) => html`
      <div class="search-results__item article-card" data-ref="${result.ref}">
        <h3 class="article-card__title">
          <a href="${result.data.url}">${result.data.title}</a>
        </h3>
        <div class="article-card__excerpt">
          <p>
            ${result.data.summary}
            <a class="article-card__readmore" href="${result.data.url}"><span data-hover="Read more">Read more</span></a>
          </p>
        </div>
      </div>
    `);
  } else {
    res = html`<li class="empty">No articles found matching the query</li>`;
  }
  return html`${res}`;
};

function search(query: string) : void {
  window.history.replaceState({}, document.title,
                              `${window.location.pathname}?q=${query}`);

  searchIndex
    .search(query)
    .then((results) => {
      render(resultTemplate(results), searchResults);
    });
}


new BaseScripts();

queryField.focus();

if (searchParams.has('q')) {
  const query = searchParams.get('q');
  queryField.value = query;
  search(query);
}

searchForm.addEventListener('submit', (ev) => {
  const form = ev.currentTarget as HTMLFormElement;
  const queryField = form.elements.q;
  ev.preventDefault();
  search(queryField.value);
  return false;
});
