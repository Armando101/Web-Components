class ButtonInfo extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = this._htmlTemplate();
    this.isHidden = true;
    this.$info = this.shadowRoot.querySelector("#info-box");
    this.$button = this.shadowRoot.querySelector("button");
  }

  connectedCallback() {
    this.$button.addEventListener("click", this._showInfo.bind(this));
    this._initializeComponent();
  }

  _showInfo() {
    this.$info.style.display = this.isHidden ? "block" : "none";
    this.$button.textContent = this.isHidden ? "Hide" : "Show";
    this.isHidden = !this.isHidden;
  }

  _initializeComponent() {
    const isVisible = this.getAttribute("is-visible");
    this.isHidden = isVisible;
    this._showInfo();
  }

  _htmlTemplate() {
    return `
      <button>Show</button>
      <p id="info-box"><slot>More infos!</slot></p>
    `;
  }
}

customElements.define("my-button-info", ButtonInfo);
