export default class SearchIndex {
  _index: lunr.Index | undefined;
  _data: object | undefined;

  constructor() {
    this._index = undefined;
    this._data = undefined;
  }

  getIndex() : Promise<any> {
    if (this._index && this._data) {
      return Promise.resolve([this._index, this._data]);
    }

    return Promise.all([
      fetch('/search_index.json')
        .then(resp => resp.json()),
      import(/* webpackChunkName:"lunr" */'lunr'), // tslint:disable-line space-in-parens
    ])
      .then(([{ index, data }, lunr]) => {
        this._index = lunr.Index.load(index);
        this._data = data;
        return [this._index, this._data];
      });
  }

  search(query: string) {
    return this.getIndex()
    .then(([index, data]) => {
      if (index && data) {
        return index.search(query)
        .map((res: { ref: string, data: string }) => {
          res.data = data[res.ref];
          return res;
        });
      }
    });
  }
}
