/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
export namespace Components {
    interface AppNavigation {
    }
    interface AppSideDrawer {
        "open": () => Promise<void>;
        "opened": boolean;
        "title": string;
    }
    interface AppTooltip {
    }
    interface MyComponent {
        /**
          * The first name
         */
        "first": string;
        /**
          * The last name
         */
        "last": string;
        /**
          * The middle name
         */
        "middle": string;
    }
}
declare global {
    interface HTMLAppNavigationElement extends Components.AppNavigation, HTMLStencilElement {
    }
    var HTMLAppNavigationElement: {
        prototype: HTMLAppNavigationElement;
        new (): HTMLAppNavigationElement;
    };
    interface HTMLAppSideDrawerElement extends Components.AppSideDrawer, HTMLStencilElement {
    }
    var HTMLAppSideDrawerElement: {
        prototype: HTMLAppSideDrawerElement;
        new (): HTMLAppSideDrawerElement;
    };
    interface HTMLAppTooltipElement extends Components.AppTooltip, HTMLStencilElement {
    }
    var HTMLAppTooltipElement: {
        prototype: HTMLAppTooltipElement;
        new (): HTMLAppTooltipElement;
    };
    interface HTMLMyComponentElement extends Components.MyComponent, HTMLStencilElement {
    }
    var HTMLMyComponentElement: {
        prototype: HTMLMyComponentElement;
        new (): HTMLMyComponentElement;
    };
    interface HTMLElementTagNameMap {
        "app-navigation": HTMLAppNavigationElement;
        "app-side-drawer": HTMLAppSideDrawerElement;
        "app-tooltip": HTMLAppTooltipElement;
        "my-component": HTMLMyComponentElement;
    }
}
declare namespace LocalJSX {
    interface AppNavigation {
    }
    interface AppSideDrawer {
        "opened"?: boolean;
        "title"?: string;
    }
    interface AppTooltip {
    }
    interface MyComponent {
        /**
          * The first name
         */
        "first"?: string;
        /**
          * The last name
         */
        "last"?: string;
        /**
          * The middle name
         */
        "middle"?: string;
    }
    interface IntrinsicElements {
        "app-navigation": AppNavigation;
        "app-side-drawer": AppSideDrawer;
        "app-tooltip": AppTooltip;
        "my-component": MyComponent;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "app-navigation": LocalJSX.AppNavigation & JSXBase.HTMLAttributes<HTMLAppNavigationElement>;
            "app-side-drawer": LocalJSX.AppSideDrawer & JSXBase.HTMLAttributes<HTMLAppSideDrawerElement>;
            "app-tooltip": LocalJSX.AppTooltip & JSXBase.HTMLAttributes<HTMLAppTooltipElement>;
            "my-component": LocalJSX.MyComponent & JSXBase.HTMLAttributes<HTMLMyComponentElement>;
        }
    }
}
