import { EventEmitter } from "../../stencil-public-runtime";
export declare class StockFinder {
  stockNameInput: HTMLInputElement;
  searchResults: {
    symbol: string;
    name: string;
  }[];
  ucSymbolSelected: EventEmitter<string>;
  loading: boolean;
  onFindStocks(event: Event): void;
  onSelectSymbol(symbol: string): void;
  render(): any[];
}
