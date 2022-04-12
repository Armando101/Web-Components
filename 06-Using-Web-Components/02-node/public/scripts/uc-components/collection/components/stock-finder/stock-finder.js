import { Component, Event, h, State } from "@stencil/core";
import { AV_API_KEY } from "../../global/global";
export class StockFinder {
  constructor() {
    this.searchResults = [];
    this.loading = false;
  }
  onFindStocks(event) {
    event.preventDefault();
    const stockName = this.stockNameInput.value;
    this.loading = true;
    fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${stockName}&apikey=${AV_API_KEY}`)
      .then(res => res.json())
      .then(parsedRes => {
      this.searchResults = parsedRes['bestMatches']
        .map(item => ({ name: item['2. name'], symbol: item['1. symbol'] }));
      this.loading = false;
    }).catch(err => {
      console.error(err);
      this.loading = false;
    });
  }
  onSelectSymbol(symbol) {
    this.ucSymbolSelected.emit(symbol);
  }
  render() {
    let content = (h("ul", null, this.searchResults.map(result => (h("li", { onClick: this.onSelectSymbol.bind(this, result.symbol) },
      h("span", null,
        result.symbol,
        " "),
      h("span", null, result.name))))));
    if (this.loading) {
      content = h("app-spinner", null);
    }
    return [
      h("form", { onSubmit: this.onFindStocks.bind(this) },
        h("input", { id: "stock-symbol", ref: el => (this.stockNameInput = el), type: "text" }),
        h("button", { type: "submit" }, "Find!")),
      content,
    ];
  }
  static get is() { return "app-stock-finder"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() { return {
    "$": ["./stock-finder.css"]
  }; }
  static get styleUrls() { return {
    "$": ["stock-finder.css"]
  }; }
  static get states() { return {
    "searchResults": {},
    "loading": {}
  }; }
  static get events() { return [{
      "method": "ucSymbolSelected",
      "name": "ucSymbolSelected",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [],
        "text": ""
      },
      "complexType": {
        "original": "string",
        "resolved": "string",
        "references": {}
      }
    }]; }
}
