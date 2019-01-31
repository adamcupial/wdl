import { mark } from './logger';

export default class SearchIndex {
  index: object;
  data: object;

  getIndex() {
    mark('Search:getIndex').start();

    if (this.index && this.data) {
      return Promise.resolve([this.index, this.data]);
    } else {
      return Promise.all([
        fetch('/search_index.json')
        .then(resp => resp.json()),
          import(/* webpackChunkName:"lunr" */'lunr')
      ])
      .then(([idx, lunr]) => {
        this.index = lunr.Index.load(idx.index);
        this.data = idx.data;
        mark('Search:getIndex').end();
        return [this.index, this.data];
      });
    }
  }

  async search(query) {
    mark('Search:search').start();

    return this.getIndex()
      .then(([index, data]) => {
        const result = index
        .search(query)
        .map((res) => {
          res.data = data[res.ref];
          return res;
        });

        mark('Search:search').end();
        return result;
      });
  }
}
