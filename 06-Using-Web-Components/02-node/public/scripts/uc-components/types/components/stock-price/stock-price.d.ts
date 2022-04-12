export declare class StockPrice {
  stockInput: HTMLInputElement;
  price: number;
  stockUserInput: string;
  stockInputValid: boolean;
  error: string;
  loading: boolean;
  stockSymbol: string;
  stockSymbolChanged(newValue: string, oldValue: string): void;
  onUserInput(event: Event): void;
  fetchStockPrice(stockSymbol: string): void;
  onFetchStockPrice(event: Event): void;
  componentDidLoad(): void;
  componentWillLoad(): void;
  componentWillUpdate(): void;
  componentDidUpdate(): void;
  onStockSymbolSelected(event: CustomEvent): void;
  disconnectedCallback(): void;
  hostData(): {
    class: string;
  };
  render(): any[];
}
