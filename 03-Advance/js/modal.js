class Modal extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = this.htmlTemplate;
    this.isOpen = false;
    this.cancelEvent();
    this.confirmEvent();
    this.backdropEvent();
  }

  backdropEvent() {
    const backdrop = this.shadowRoot.querySelector("#backdrop");
    backdrop.addEventListener("click", this.hide.bind(this));
  }

  cancelEvent() {
    const cancelButton = this.shadowRoot.querySelector("#cancel-btn");
    cancelButton.addEventListener("click", this._cancel.bind(this));
    cancelButton.addEventListener("cancel", () => {
      console.log("Cancel inside WC");
    });
  }

  confirmEvent() {
    const confirmButton = this.shadowRoot.querySelector("#confirm-btn");
    confirmButton.addEventListener("click", this._confirm.bind(this));
  }

  hide() {
    if (this.hasAttribute("opened")) {
      this.removeAttribute("opened");
    }
    this.isOpen = false;
  }

  _cancel(event) {
    this.hide();
    const cancelEvent = new Event("cancel", { bubbles: true, composed: true });
    event.target.dispatchEvent(cancelEvent);
  }

  _confirm() {
    this.hide();
    const confirmEvent = new Event("confirm");
    this.dispatchEvent(confirmEvent);
  }

  observeSlotChange() {
    const slots = this.shadowRoot.querySelectorAll("slot");
    slots[1].addEventListener("slotchange", (event) => {
      console.log(slots[1].assignedNodes());
    });
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "opened" && this.isOpened) {
      this.isOpen = true;
    } else {
      this.isOpen = false;
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

        :host([opened]) #modal {
          top: 15vh;
        }

        #modal {
          position: fixed;
          top: 10vh;
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
          transition: all 0.3s ease-out;
        }

        header {
          padding: 1rem;
          border-bottom: 1px solid #ccc;
        }
        
        ::slotted(h1) {
          font-size: 1.25rem;
          margin: 0;
        }
        
        #main {
          padding: 1rem;
        }
        
        #actions {
          border-bottom: 1px solid #ccc;
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
          <button id="cancel-btn">Cancel</button>
          <button id="confirm-btn">Ok</button>
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
