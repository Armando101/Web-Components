import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';

const spinnerCss = ".lds-ellipsis{display:inline-block;position:relative;width:80px;height:80px}.lds-ellipsis div{position:absolute;top:33px;width:13px;height:13px;border-radius:50%;background:#fff;animation-timing-function:cubic-bezier(0, 1, 1, 0);background-color:black}.lds-ellipsis div:nth-child(1){left:8px;animation:lds-ellipsis1 0.6s infinite}.lds-ellipsis div:nth-child(2){left:8px;animation:lds-ellipsis2 0.6s infinite}.lds-ellipsis div:nth-child(3){left:32px;animation:lds-ellipsis2 0.6s infinite}.lds-ellipsis div:nth-child(4){left:56px;animation:lds-ellipsis3 0.6s infinite}@keyframes lds-ellipsis1{0%{transform:scale(0)}100%{transform:scale(1)}}@keyframes lds-ellipsis3{0%{transform:scale(1)}100%{transform:scale(0)}}@keyframes lds-ellipsis2{0%{transform:translate(0, 0)}100%{transform:translate(24px, 0)}}";

const Spinner = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
  }
  render() {
    return (h("div", { class: "lds-ellipsis" }, h("div", null), h("div", null), h("div", null), h("div", null)));
  }
  static get style() { return spinnerCss; }
}, [1, "app-spinner"]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["app-spinner"];
  components.forEach(tagName => { switch (tagName) {
    case "app-spinner":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, Spinner);
      }
      break;
  } });
}

export { Spinner as S, defineCustomElement as d };
