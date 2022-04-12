import type { Components, JSX } from "../types/components";

interface AppStockFinder extends Components.AppStockFinder, HTMLElement {}
export const AppStockFinder: {
  prototype: AppStockFinder;
  new (): AppStockFinder;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
