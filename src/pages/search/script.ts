import './style.scss';
import BaseScripts from 'scripts/base';
import SearchIndex from 'scripts/search';

new BaseScripts();
const searchParams = new URLSearchParams(window.location.search);
if (searchParams.has('q')) {
  const form = document.getElementById('search-form');
  form.elements.q.value = searchParams.get('q');

  new SearchIndex()
    .search(searchParams.get('q'))
    .then((result) => {
      let str = '';
      if (result.length) {
        str = result
        .map(res => `<li><a href="${res.data.url}">${res.data.title}</a></li>`)
        .join('');
      } else {
        str = '<li class="empty">No articles found matching query</li>'
      }
      window.requestAnimationFrame(() => {
        document.getElementById('search-results').innerHTML = str;
      });
    });
}
