class Tooltip extends HTMLElement {
  constructor() {
    super(); // It's requred to call super method to invoke parent constructor
    this._tooltipContainer;
    this._tooltipText = "Some dummy tooltip text.";

    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = this._htmlTemplate();
  }

  connectedCallback() {
    this.addTooltipText();
    const tooltipIcon = this.shadowRoot.querySelector("span");
    tooltipIcon.textContent = " (?)";
    tooltipIcon.addEventListener("mouseenter", this._showTooltip.bind(this));
    tooltipIcon.addEventListener("mouseleave", this._hideTooltip.bind(this));
    this.shadowRoot.appendChild(tooltipIcon);
    this.style.position = "relative";
  }

  addTooltipText() {
    if (this.hasAttribute("text")) {
      this._tooltipText = this.getAttribute("text");
    }
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) {
      return;
    }
    if (name === "text") {
      this._tooltipText = newValue;
    }
  }

  static get observedAttributes() {
    return ["text"];
  }

  _showTooltip() {
    this._tooltipContainer = document.createElement("div");
    this._tooltipContainer.textContent = this._tooltipText;
    this.shadowRoot.appendChild(this._tooltipContainer);
  }

  _hideTooltip() {
    this.shadowRoot.removeChild(this._tooltipContainer);
  }

  _htmlTemplate() {
    return `
      <style>
        div {
          background-color: black;
          color: white;
          position: absolute;
          z-index: 10;
        }
        .highlight {
          /* This styles have not effect to my slotted element */
          background-color: orange;
        }
        ::slotted(.highlight) {
          /* This styles are inside my shadow DOM */
          border: 1px dotted red;
        }
        .icon {
          background: black;
          color: white;
          text-align: center;
          border-radius: 50%;
        }
        /* Styling Web components inside shadow DOM */
        :host {
          background: #ccc;
        }

        /* Styling using custom css */
        :host {
          background: var(--primary, #ccc);
        }

        /* We can style with a condition */
        :host(.is-purple) {
          background: purple;
          color: white;
        }

        /* Onl applied this styles if the WC in inside a paragraph tag with the class paragraph */
        :host-context(p.paragraph) {
          font-weight: bold;
        }
      </style>
      <slot>Some default</slot>
      <span class="icon">(?)</span>`;
  }
}

customElements.define("my-tooltip", Tooltip);
