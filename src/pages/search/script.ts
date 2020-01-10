import './style.scss';
import 'scripts/base';
import SearchIndex from 'scripts/search';

const searchIndex = new SearchIndex();

function search(query: string) : void {
  const searchResults = document.querySelector('.search-results__content');

  import('lit-html')
    .then(({ html, render }) => {
      window.history.replaceState({}, document.title,
                                  `${window.location.pathname}?q=${query}`);

      const resultTemplate = (results) => {
        let res = null;
        if (results.length) {
          res = results.map(result => html`
            <div class="search-results__item" data-ref="${result.ref}">
              <h3 class="search-results__item-title">
                <a href="${result.data.url}">${result.data.title}</a>
              </h3>
              <div class="search-results__item-excerpt">
                <p> ${result.data.summary} </p>
              </div>
              <div class="search-results__item-terms">
                <strong>matches found:</strong> <em>${Object.keys(result.matchData.metadata).slice(0, 20).join(', ')}</em>
              </div>
            </div>
          `);
        } else {
          res = html`<div class="empty">No articles found matching the query</div>`;
        }
        return html`${res}`;
      };

      searchIndex
        .search(query)
        .then((results) => {
          render(resultTemplate(results), searchResults);
        });
    });
}

const searchForm = document.getElementById('search-form') as HTMLFormElement;
const queryField = searchForm.elements['q'] as HTMLInputElement;
const searchParams = new URLSearchParams(window.location.search);

queryField.focus();

if (searchParams.has('q')) {
  const query = searchParams.get('q') || '';
  queryField.value = query;
  search(query);
}

searchForm.addEventListener('submit', (ev) => {
  const form = ev.currentTarget as HTMLFormElement;
  const queryField = form.elements['q'] as HTMLInputElement;
  ev.preventDefault();
  search(queryField.value);
  return false;
});
