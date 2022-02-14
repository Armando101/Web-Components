class ConfirmLink extends HTMLAnchorElement {
  connectedCallback() {
    this.addEventListener("click", this.handleClick);
  }

  handleClick(event) {
    if (!confirm("Do you want to leave?")) {
      event.preventDefault();
    }
  }
}

customElements.define("my-confirm-link", ConfirmLink, { extends: "a" });
