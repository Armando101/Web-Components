import { Component, h } from "@stencil/core";

@Component({
  tag: 'app-stock-price',
  styleUrl: 'stock-price.css',
  shadow: true
})
export class StockPrice {

  onFetchStockPrice(event: Event) {
    event.preventDefault();
    console.log(event);
  }

  render() {
    return [
      <form onSubmit={this.onFetchStockPrice}>
        <input id="stock-symbol" type="text" />
        <button type="submit">Fetch</button>
      </form>,
      <div>
        <p>Price: {0}</p>
      </div>
    ];
  }
} 