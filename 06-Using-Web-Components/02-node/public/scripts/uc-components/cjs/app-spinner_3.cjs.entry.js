'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-9ee92823.js');

const spinnerCss = ".lds-ellipsis{display:inline-block;position:relative;width:80px;height:80px}.lds-ellipsis div{position:absolute;top:33px;width:13px;height:13px;border-radius:50%;background:#fff;animation-timing-function:cubic-bezier(0, 1, 1, 0);background-color:black}.lds-ellipsis div:nth-child(1){left:8px;animation:lds-ellipsis1 0.6s infinite}.lds-ellipsis div:nth-child(2){left:8px;animation:lds-ellipsis2 0.6s infinite}.lds-ellipsis div:nth-child(3){left:32px;animation:lds-ellipsis2 0.6s infinite}.lds-ellipsis div:nth-child(4){left:56px;animation:lds-ellipsis3 0.6s infinite}@keyframes lds-ellipsis1{0%{transform:scale(0)}100%{transform:scale(1)}}@keyframes lds-ellipsis3{0%{transform:scale(1)}100%{transform:scale(0)}}@keyframes lds-ellipsis2{0%{transform:translate(0, 0)}100%{transform:translate(24px, 0)}}";

const Spinner = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
  }
  render() {
    return (index.h("div", { class: "lds-ellipsis" }, index.h("div", null), index.h("div", null), index.h("div", null), index.h("div", null)));
  }
};
Spinner.style = spinnerCss;

const AV_API_KEY = 'GY15WVSH8G39ZJYS';

const stockFinderCss = ":host{font-family:Arial, Helvetica, sans-serif;border:2px solid rgb(87, 3, 87);margin:2rem;padding:1rem;display:block}form input{font:inherit;color:rgb(87, 3, 87);padding:0.1rem 0.25rem;margin-block-end:0.5rem;display:block}form input:focus{outline:none}form button{font:inherit;padding:0.25rem 0.5rem;border:1px solid rgb(87, 3, 87);background-color:rgb(87, 3, 87);color:white;cursor:pointer}form button:hover,form button:active{background-color:rgb(175, 88, 175)}form button:disabled{background-color:#ccc;border-color:#ccc;color:white}ul{margin:0;padding:0;list-style:none}ul li{margin:0.25rem 0;padding:0.25rem;border:1px solid #ccc}ul li span:first-child{font-weight:bold}li:hover,li:active{background-color:rgb(175, 88, 175);color:white}";

const StockFinder = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.ucSymbolSelected = index.createEvent(this, "ucSymbolSelected", 7);
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
    let content = (index.h("ul", null, this.searchResults.map(result => (index.h("li", { onClick: this.onSelectSymbol.bind(this, result.symbol) }, index.h("span", null, result.symbol, " "), index.h("span", null, result.name))))));
    if (this.loading) {
      content = index.h("app-spinner", null);
    }
    return [
      index.h("form", { onSubmit: this.onFindStocks.bind(this) }, index.h("input", { id: "stock-symbol", ref: el => (this.stockNameInput = el), type: "text" }), index.h("button", { type: "submit" }, "Find!")),
      content,
    ];
  }
};
StockFinder.style = stockFinderCss;

const stockPriceCss = ":host{font-family:Arial, Helvetica, sans-serif;border:2px solid rgb(87, 3, 87);margin:2rem;padding:1rem;display:block}:host(.error){border-color:orange}form input{font:inherit;color:rgb(87, 3, 87);padding:0.1rem 0.25rem;margin-block-end:0.5rem;display:block}form input:focus{outline:none}form button{font:inherit;padding:0.25rem 0.5rem;border:1px solid rgb(87, 3, 87);background-color:rgb(87, 3, 87);color:white;cursor:pointer}form button:hover,form button:active{background-color:rgb(175, 88, 175)}form button:disabled{background-color:#ccc;border-color:#ccc;color:white}";

const StockPrice = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.stockInputValid = false;
    this.loading = false;
  }
  stockSymbolChanged(newValue, oldValue) {
    if (newValue !== oldValue) {
      this.stockUserInput = newValue;
      this.fetchStockPrice(newValue);
    }
  }
  onUserInput(event) {
    this.stockUserInput = event.target.value;
    if (this.stockUserInput.trim() !== '') {
      this.stockInputValid = true;
    }
    else {
      this.stockInputValid = false;
    }
  }
  fetchStockPrice(stockSymbol) {
    this.loading = true;
    fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stockSymbol}&apikey=${AV_API_KEY}`)
      .then(res => {
      if (res.status !== 200) {
        throw new Error('Invalid!');
      }
      return res.json();
    })
      .then(res => {
      const response = res['Global Quote']['05. price'];
      if (!response) {
        throw new Error('Invalid symbol!');
      }
      this.error = null;
      this.price = Number(response);
      this.loading = false;
    })
      .catch(err => {
      this.error = err.message;
      this.price = null;
      this.loading = false;
    });
  }
  onFetchStockPrice(event) {
    event.preventDefault();
    this.stockSymbol = this.stockInput.value;
  }
  componentDidLoad() {
    if (this.stockSymbol) {
      // this.initialStockSymbol = this.stockSymbol;
      this.stockUserInput = this.stockSymbol;
      this.stockInputValid = true;
      this.fetchStockPrice(this.stockSymbol);
    }
  }
  componentWillLoad() { }
  componentWillUpdate() { }
  componentDidUpdate() {
    // if (this.stockSymbol !== this.initialStockSymbol) {
    //   this.initialStockSymbol = this.stockSymbol;
    //   this.fetchStockPrice(this.stockSymbol);
    // }
  }
  onStockSymbolSelected(event) {
    console.log('Stock selected ', event.detail);
    if (event.detail && event.detail !== this.stockSymbol) {
      this.stockSymbol = event.detail;
    }
  }
  disconnectedCallback() {
    console.log('componentDidUnload');
  }
  hostData() {
    return { class: this.error ? 'hydrated error' : 'hydrated' };
  }
  __stencil_render() {
    let dataContent = index.h("p", null, "Please enter a symbol");
    if (this.error) {
      dataContent = index.h("p", null, this.error);
    }
    if (this.price) {
      dataContent = index.h("p", null, "Price: $", this.price || 0);
    }
    if (this.loading) {
      dataContent = index.h("app-spinner", null);
    }
    return [
      index.h("form", { onSubmit: this.onFetchStockPrice.bind(this) }, index.h("input", { id: "stock-symbol", ref: el => (this.stockInput = el), type: "text", value: this.stockUserInput, onInput: this.onUserInput.bind(this) }), index.h("button", { type: "submit", disabled: !this.stockInputValid || this.loading }, "Fetch")),
      index.h("div", null, dataContent),
    ];
  }
  static get watchers() { return {
    "stockSymbol": ["stockSymbolChanged"]
  }; }
  render() { return index.h(index.Host, this.hostData(), this.__stencil_render()); }
};
StockPrice.style = stockPriceCss;

exports.app_spinner = Spinner;
exports.app_stock_finder = StockFinder;
exports.app_stock_price = StockPrice;
