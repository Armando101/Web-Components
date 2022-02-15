class Tooltip extends HTMLElement {
  constructor() {
    super(); // It's requred to call super method to invoke parent constructor

    this._tooltipText = "Some dummy tooltip text.";

    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = this._htmlTemplate();
    this.tooltipIcon;
    this._tooltipVisible = false;
  }

  connectedCallback() {
    this.addTooltipText();
    this.tooltipIcon = this.shadowRoot.querySelector("span");
    this.tooltipIcon.textContent = " (?)";
    this.tooltipIcon.addEventListener(
      "mouseenter",
      this._showTooltip.bind(this)
    );
    this.tooltipIcon.addEventListener(
      "mouseleave",
      this._hideTooltip.bind(this)
    );
    this.shadowRoot.appendChild(this.tooltipIcon);
    this.style.position = "relative";
    this._render();
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
    this._tooltipVisible = true;
    this._render();
  }

  _hideTooltip() {
    this._tooltipVisible = false;
    this._render();
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

  _render() {
    let tooltipContainer = this.shadowRoot.querySelector("div");
    if (this._tooltipVisible) {
      tooltipContainer = document.createElement("div");
      tooltipContainer.textContent = this._tooltipText;
      this.shadowRoot.appendChild(tooltipContainer);
      return;
    }
    if (tooltipContainer) {
      this.shadowRoot.removeChild(tooltipContainer);
    }
  }

  disconnectedCallback() {
    this.tooltipIcon.removeEventListener("mouseenter", this._showTooltip);
    this.tooltipIcon.removeEventListener("mouseleave", this._hideTooltip);
  }
}

customElements.define("my-tooltip", Tooltip);
