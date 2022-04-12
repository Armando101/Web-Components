import { Component, h, Listen, Prop, State, Watch } from '@stencil/core';
import { AV_API_KEY } from '../../global/global';
export class StockPrice {
  constructor() {
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
  render() {
    let dataContent = h("p", null, "Please enter a symbol");
    if (this.error) {
      dataContent = h("p", null, this.error);
    }
    if (this.price) {
      dataContent = h("p", null,
        "Price: $",
        this.price || 0);
    }
    if (this.loading) {
      dataContent = h("app-spinner", null);
    }
    return [
      h("form", { onSubmit: this.onFetchStockPrice.bind(this) },
        h("input", { id: "stock-symbol", ref: el => (this.stockInput = el), type: "text", value: this.stockUserInput, onInput: this.onUserInput.bind(this) }),
        h("button", { type: "submit", disabled: !this.stockInputValid || this.loading }, "Fetch")),
      h("div", null, dataContent),
    ];
  }
  static get is() { return "app-stock-price"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() { return {
    "$": ["stock-price.css"]
  }; }
  static get styleUrls() { return {
    "$": ["stock-price.css"]
  }; }
  static get properties() { return {
    "stockSymbol": {
      "type": "string",
      "mutable": true,
      "complexType": {
        "original": "string",
        "resolved": "string",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": ""
      },
      "attribute": "stock-symbol",
      "reflect": true
    }
  }; }
  static get states() { return {
    "price": {},
    "stockUserInput": {},
    "stockInputValid": {},
    "error": {},
    "loading": {}
  }; }
  static get watchers() { return [{
      "propName": "stockSymbol",
      "methodName": "stockSymbolChanged"
    }]; }
  static get listeners() { return [{
      "name": "ucSymbolSelected",
      "method": "onStockSymbolSelected",
      "target": "body",
      "capture": false,
      "passive": false
    }]; }
}
