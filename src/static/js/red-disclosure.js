import { css, LitElement, render } from "lit"
import { html } from 'lit/static-html.js';
import { ref, createRef } from 'lit/directives/ref.js';
import { injectGlobalStyles } from "./injectGlobalStyles"

const getSlotContent = (slot) => {
  if (slot) {
    return slot.assignedNodes({flatten: true})[0]
  }
}

export class RedDisclosure extends LitElement {
  constructor() {
    super()
  }

  static properties = {
    id: {
      type: String,
    },
    open: {
      type: Boolean,
      reflect: true,
    }
  }

  headerRef = createRef()
  headerButtonRef = createRef()

  switchExpanded(update) {
    this.open = !this.open
    update()
    console.log("this.headerRef", this.headerRef.value)
    // this._renderHeaderSolt(this.headerRef.value)
  }

  _renderHeaderSolt(slot) {
    const header = getSlotContent(slot)
    if (header) {
      const text = header.textContent
      header.classList.add("red-disclosure__header")
      header.textContent = ""
      render(html`
        <button
          @click=${() => this.switchExpanded(this.requestUpdate.bind(this))}
          class="red-disclosure__headerButton"
          aria-expanded=${!!this.open}>${text}
        </button>
      `, header)
    }
  }

  handleHeaderchange(e) {
    this._renderHeaderSolt(e.target)
  }

  handleContentchange(e) {
    const content = getSlotContent(e.target)
    content.classList.add("red-disclosure__content")
  }

  render() {
    return html`
      <style>
        .header {
          color: blue;
        }
      </style>
      <slot @slotchange=${this.handleHeaderchange} ${ref(this.headerRef)} name="header"></slot>
      <slot @slotchange=${this.handleContentchange} ?hidden=${!this.open} name="content"></slot>
    `
  }
}

customElements.define("red-disclosure", RedDisclosure)
injectGlobalStyles(css`
  .red-disclosure__headerButton {
    all: inherit;
    border: solid 2px var(--red-border-color, black);
    border-radius: 0.5rem;
    padding: 1rem;
    cursor: pointer;
  }

  .red-disclosure__headerButton:focus {
    outline: 2px solid var(--red-tabs-accent-color, red);
    outline-offset: 2px;
  }

  .red-disclosure__headerButton[aria-expanded="true"] {
    border-color: transparent;
  }
`)
