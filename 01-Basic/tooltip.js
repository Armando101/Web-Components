class Tooltip extends HTMLElement {
  tooltipContainer;
  constructor() {
    super(); // It's requred to call super method to invoke parent constructor
  }

  connectedCallback() {
    const tooltipIcon = document.createElement("span");
    tooltipIcon.textContent = " (?)";
    tooltipIcon.addEventListener("mouseenter", this._showTooltip.bind(this));
    tooltipIcon.addEventListener("mouseleave", this._hideTooltip.bind(this));
    this.appendChild(tooltipIcon);
  }

  _showTooltip() {
    this.tooltipContainer = document.createElement("div");
    this.tooltipContainer.textContent = "This is the tooltip text";
    this.appendChild(this.tooltipContainer);
  }

  _hideTooltip() {
    this.removeChild(this.tooltipContainer);
  }
}

customElements.define("my-tooltip", Tooltip);
