class Modal extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = this.htmlTemplate;
    this.isOpen = false;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "opened" && this.isOpened) {
      this.isOpen = true;
    } else {
      this.open = false;
    }
  }

  static get observedAttributes() {
    return ["opened"];
  }

  get isOpened() {
    return this.hasAttribute("opened");
  }

  get htmlTemplate() {
    return `
      <style>
        #backdrop {
          position: fixed;
          top: 0;
          left: 0;
          inline-size: 100%;
          block-size: 100vh;
          background: rgba(0, 0, 0, 0.75);
          z-index: 10;
          opacity: 0;
          pointer-events: none;
        }

        :host([opened]) #backdrop,
        :host([opened]) #modal {
          opacity: 1;
          pointer-events: all;
        }

        #modal {
          position: fixed;
          top: 15vh;
          left: 25%;
          width: 50%;
          z-index: 100;
          background: white;
          box-shadow: 0 2px 8px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          opacity: 0;
          pointer-events: none;
        }

        header {
          padding: 1rem;
        }

        ::slotted(h1) {
          font-size: 1.25rem;
        }

        #main {
          padding: 1rem;
        }

        #actions {
          border-top: 1px solid gray;
          padding: 1rem;
          display: flex;
          justify-content: flex-end;
        }

        #actions button {
          margin: 0 0.25rem;
        }
      </style>

      <div id="backdrop"></div>
      <div id="modal">
        <header>
          <slot name="title"></slot>
        </header>
        <section id="main">
          <slot name="main"></slot>
        </section>
        <section id="actions">
          <button>Cancel</button>
          <button>Ok</button>
        </section>
      </div>
    `;
  }

  /**
   * Open modal
   */
  open() {
    console.log("open");
    this.setAttribute("opened", "");
  }
}

customElements.define("my-modal", Modal);
