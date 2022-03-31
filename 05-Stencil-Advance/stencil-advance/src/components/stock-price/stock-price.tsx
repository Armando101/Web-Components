import { Component, Element, h, State } from '@stencil/core';
import { AV_API_KEY } from '../../global/global';

@Component({
  tag: 'app-stock-price',
  styleUrl: 'stock-price.css',
  shadow: true,
})
export class StockPrice {
  stockInput: HTMLInputElement;
  // @Element() el: HTMLElement;
  @State() price: number;
  @State() stockUserInput: string;
  @State() stockInputValid = false;
  @State() error: string;

  onUserInput(event: Event) {
    this.stockUserInput = (event.target as HTMLInputElement).value;
    if (this.stockUserInput.trim() !== '') {
      this.stockInputValid = true;
    } else {
      this.stockInputValid = false;
    }
  }

  onFetchStockPrice(event: Event) {
    event.preventDefault();
    // const stockSymbol = (this.el.shadowRoot.querySelector('#stock-symbol') as HTMLInputElement).value;
    const stockSymbol = this.stockInput.value;
    fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stockSymbol}&apikey=${AV_API_KEY}`)
      .then(res => {
        if (res.status !== 200) {
          throw new Error('Invali!');
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
      })
      .catch(err => {
        this.error = err.message;
      });
  }

  render() {
    let dataContent = <p>Please enter a symbol</p>;
    if (this.error) {
      dataContent = <p>{this.error}</p>;
    }
    if (this.price) {
      dataContent = <p>Price: ${this.price || 0}</p>;
    }
    return [
      <form onSubmit={this.onFetchStockPrice.bind(this)}>
        <input id="stock-symbol" ref={el => (this.stockInput = el)} type="text" value={this.stockUserInput} onInput={this.onUserInput.bind(this)} />
        <button type="submit" disabled={!this.stockInputValid}>
          Fetch
        </button>
      </form>,
      <div>{dataContent}</div>,
    ];
  }
}
