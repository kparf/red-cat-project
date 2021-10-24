import { css, LitElement } from "lit"
import { html, unsafeStatic } from 'lit/static-html.js';
import { ref, createRef } from 'lit/directives/ref.js';
import MarkdownIt from "markdown-it"


const md = new MarkdownIt()
const createTabId = (index) => `tab-${index}`
const createTabpanelId = (index) => `tabpanel-${index}`

export class Tabs extends LitElement {

  constructor() {
    super()
    this.items = []
    this._selected = 0
}

  static properties = {
    items: { type: Array },
    _selected: { state: true }
  };

  static styles = css`
    :host {
    }

    .tab {
      display: block;
      text-decoration: none;
      padding: 1rem;
      border-radius: 0.5rem;
      border: solid 2px var(--red-border-color, black);
      font-weight: bold;
      color: var(--red-tabs-color, black);
    }

    .tab:focus-visible {
      outline: 2px solid var(--red-tabs-accent-color, red);
      outline-offset: 2px;
    }

    .tab[aria-selected="true"] {
      color: var(--red-tabs-accent-color, red);
    }

    .tablist {
      display: flex;
      list-style: none;
      padding: 0;
      margin: 0;
      flex-wrap: wrap;

      gap: 1rem;
    }

    .tabpanel {
      border-radius: 0.5rem;
      border: solid 2px var(--red-border-color, black);
      padding: 1rem;
      margin-top: 1.5rem;
    }

    .tabpanel:focus {
      outline: 2px solid var(--red-tabs-accent-color, red);
      outline-offset: 2px;
    }
  `

  _tabpanelRef = createRef()

  _selectHandler(e) {
    e.preventDefault()
    const { index } = e.target.dataset || 0
    this._selected = Number(index)
    this.focusTabpanel(index)
  }

  focusTabpanel(selected) {
    const tabpanel = this._tabpanelRef.value
    console.log(tabpanel)
    if (selected !== undefined && tabpanel) {
      tabpanel.focus()
    }
  }

  updated(changedProperties) {
    const selected = changedProperties.get("_selected")
    this.focusTabpanel(selected)
  }

  render() {
    const selected = this.items[this._selected]

    return html`
      <ul class ="tablist" role="tablist">
        ${this.items.map(({ name }, index) =>
          html`
            <li
              class="tab-wrapper"
              role="presentation"
            >
              <a
                data-index=${index}
                class="tab"
                role="tab"
                aria-selected=${this._selected === index}
                id=${createTabId(index)}
                href="#${createTabpanelId(index)}"
                @click=${this._selectHandler}
              >
                ${name}
              </a>
            </li>
          `
        )}
      </ul>
      <section
        ${ref(this._tabpanelRef)}
        class="tabpanel"
        tabindex="-1"
        role="tabpanel"
        aria-labeldby="${createTabId(this._selected)}"
        id="${createTabpanelId(this._selected)}"
      >
        ${unsafeStatic(md.render(selected.description))}
      </section>
    `
  }
}

customElements.define("red-tabs", Tabs)
