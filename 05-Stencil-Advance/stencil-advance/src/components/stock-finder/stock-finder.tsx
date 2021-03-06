import { Component, Event, EventEmitter, h, State } from "@stencil/core";
import { AV_API_KEY } from "../../global/global";

@Component({
  tag: 'app-stock-finder',
  styleUrl: './stock-finder.css',
  shadow: true
})
export class StockFinder {
  stockNameInput: HTMLInputElement;
  @State() searchResults: {symbol: string, name: string}[] = [];
  @Event({bubbles: true, composed: true}) ucSymbolSelected: EventEmitter<string>;
  @State() loading = false;

  onFindStocks(event: Event) {
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
      console.error(err)
      this.loading = false;
    });
  }

  onSelectSymbol(symbol: string) {
    this.ucSymbolSelected.emit(symbol);
  }

  render() {
    let content = (
      <ul>
        {this.searchResults.map(result => (
          <li onClick={this.onSelectSymbol.bind(this, result.symbol)}>
            <span>{result.symbol} </span>
            <span>{result.name}</span>
          </li>
        ))}
      </ul>
    );
    if(this.loading) {
      content = <app-spinner></app-spinner>
    }
    return [
      <form onSubmit={this.onFindStocks.bind(this)}>
        <input id="stock-symbol" ref={el => (this.stockNameInput = el)} type="text" />
        <button type="submit">Find!</button>
      </form>,
      content
      ,
    ];
  }
}