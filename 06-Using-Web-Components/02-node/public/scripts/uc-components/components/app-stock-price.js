import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { A as AV_API_KEY } from './global.js';
import { d as defineCustomElement$2 } from './spinner.js';

const stockPriceCss = ":host{font-family:Arial, Helvetica, sans-serif;border:2px solid rgb(87, 3, 87);margin:2rem;padding:1rem;display:block}:host(.error){border-color:orange}form input{font:inherit;color:rgb(87, 3, 87);padding:0.1rem 0.25rem;margin-block-end:0.5rem;display:block}form input:focus{outline:none}form button{font:inherit;padding:0.25rem 0.5rem;border:1px solid rgb(87, 3, 87);background-color:rgb(87, 3, 87);color:white;cursor:pointer}form button:hover,form button:active{background-color:rgb(175, 88, 175)}form button:disabled{background-color:#ccc;border-color:#ccc;color:white}";

const StockPrice = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
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
    let dataContent = h("p", null, "Please enter a symbol");
    if (this.error) {
      dataContent = h("p", null, this.error);
    }
    if (this.price) {
      dataContent = h("p", null, "Price: $", this.price || 0);
    }
    if (this.loading) {
      dataContent = h("app-spinner", null);
    }
    return [
      h("form", { onSubmit: this.onFetchStockPrice.bind(this) }, h("input", { id: "stock-symbol", ref: el => (this.stockInput = el), type: "text", value: this.stockUserInput, onInput: this.onUserInput.bind(this) }), h("button", { type: "submit", disabled: !this.stockInputValid || this.loading }, "Fetch")),
      h("div", null, dataContent),
    ];
  }
  static get watchers() { return {
    "stockSymbol": ["stockSymbolChanged"]
  }; }
  static get style() { return stockPriceCss; }
  render() { return h(Host, this.hostData(), this.__stencil_render()); }
}, [1, "app-stock-price", {
    "stockSymbol": [1537, "stock-symbol"],
    "price": [32],
    "stockUserInput": [32],
    "stockInputValid": [32],
    "error": [32],
    "loading": [32]
  }, [[16, "ucSymbolSelected", "onStockSymbolSelected"]]]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["app-stock-price", "app-spinner"];
  components.forEach(tagName => { switch (tagName) {
    case "app-stock-price":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, StockPrice);
      }
      break;
    case "app-spinner":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
  } });
}

const AppStockPrice = StockPrice;
const defineCustomElement = defineCustomElement$1;

export { AppStockPrice, defineCustomElement };
