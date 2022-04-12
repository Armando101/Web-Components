import type { Components, JSX } from "../types/components";

interface AppSpinner extends Components.AppSpinner, HTMLElement {}
export const AppSpinner: {
  prototype: AppSpinner;
  new (): AppSpinner;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
