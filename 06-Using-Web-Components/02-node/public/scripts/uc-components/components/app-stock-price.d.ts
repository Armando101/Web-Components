import type { Components, JSX } from "../types/components";

interface AppStockPrice extends Components.AppStockPrice, HTMLElement {}
export const AppStockPrice: {
  prototype: AppStockPrice;
  new (): AppStockPrice;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
