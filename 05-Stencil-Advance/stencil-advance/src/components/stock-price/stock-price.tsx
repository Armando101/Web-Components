import { Component, Element, h, State } from "@stencil/core";
import { AV_API_KEY } from "../../global/global";

@Component({
  tag: 'app-stock-price',
  styleUrl: 'stock-price.css',
  shadow: true
})
export class StockPrice {
  @Element() el: HTMLElement;
  @State() price: number;

  onFetchStockPrice(event: Event) {
    const stockSymbol = (this.el.shadowRoot.querySelector('#stock-symbol') as HTMLInputElement).value;
    event.preventDefault();
    fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stockSymbol}&apikey=${AV_API_KEY}`)
    .then(res => {
      return res.json();
    })
    .then(res => {
      const response = res["Global Quote"];
      this.price = Number(response["05. price"]);
    })
    .catch(err => {
      console.error(err);
    })
  }

  render() {
    return [
      <form onSubmit={this.onFetchStockPrice.bind(this)}>
        <input id="stock-symbol" type="text" />
        <button type="submit">Fetch</button>
      </form>,
      <div>
        <p>Price: ${this.price || 0}</p>
      </div>
    ];
  }
} 