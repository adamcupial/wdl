import { mark } from './logger';

export default class SearchIndex {
  __index: object;
  __data: object;

  getIndex() {
    mark('Search:getIndex').start();

    if (this.__index && this.__data) {
      return Promise.resolve([this.__index, this.__data]);
    } else {
      return Promise.all([
        fetch('/search_index.json')
        .then(resp => resp.json()),
          import(/* webpackChunkName:"lunr" */'lunr')
        ])
        .then(([{ index, data }, lunr]) => {
          this.__index = lunr.Index.load(index);
          this.__data = data;
          mark('Search:getIndex').end();
          return [this.__index, this.__data];
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
