import { proxyCustomElement, HTMLElement, createEvent, h } from '@stencil/core/internal/client';
import { A as AV_API_KEY } from './global.js';
import { d as defineCustomElement$2 } from './spinner.js';

const stockFinderCss = ":host{font-family:Arial, Helvetica, sans-serif;border:2px solid rgb(87, 3, 87);margin:2rem;padding:1rem;display:block}form input{font:inherit;color:rgb(87, 3, 87);padding:0.1rem 0.25rem;margin-block-end:0.5rem;display:block}form input:focus{outline:none}form button{font:inherit;padding:0.25rem 0.5rem;border:1px solid rgb(87, 3, 87);background-color:rgb(87, 3, 87);color:white;cursor:pointer}form button:hover,form button:active{background-color:rgb(175, 88, 175)}form button:disabled{background-color:#ccc;border-color:#ccc;color:white}ul{margin:0;padding:0;list-style:none}ul li{margin:0.25rem 0;padding:0.25rem;border:1px solid #ccc}ul li span:first-child{font-weight:bold}li:hover,li:active{background-color:rgb(175, 88, 175);color:white}";

const StockFinder = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.ucSymbolSelected = createEvent(this, "ucSymbolSelected", 7);
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
    let content = (h("ul", null, this.searchResults.map(result => (h("li", { onClick: this.onSelectSymbol.bind(this, result.symbol) }, h("span", null, result.symbol, " "), h("span", null, result.name))))));
    if (this.loading) {
      content = h("app-spinner", null);
    }
    return [
      h("form", { onSubmit: this.onFindStocks.bind(this) }, h("input", { id: "stock-symbol", ref: el => (this.stockNameInput = el), type: "text" }), h("button", { type: "submit" }, "Find!")),
      content,
    ];
  }
  static get style() { return stockFinderCss; }
}, [1, "app-stock-finder", {
    "searchResults": [32],
    "loading": [32]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["app-stock-finder", "app-spinner"];
  components.forEach(tagName => { switch (tagName) {
    case "app-stock-finder":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, StockFinder);
      }
      break;
    case "app-spinner":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
  } });
}

const AppStockFinder = StockFinder;
const defineCustomElement = defineCustomElement$1;

export { AppStockFinder, defineCustomElement };
