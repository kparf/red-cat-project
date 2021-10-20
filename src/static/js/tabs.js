import { css, LitElement } from "lit"
import { html, unsafeStatic } from 'lit/static-html.js';
import MarkdownIt from "markdown-it"


const md = new MarkdownIt()
const createTabId = (index) => `tab-${index}`
const createTabpanelId = (index) => `tabpanel-${index}`

export class Tabs extends LitElement {

  constructor() {
    super()
    this.items = []
}

  static properties = {
    items: { type: Array }
  };

  static styles = css`
  `

  render() {
    return html`
      <ul role="tablist">
        ${this.items.map(({ name }, index) =>
          html`
            <li role="presentation">
              <a
                role="tab"
                id=${createTabId(index)}
                href="#${createTabpanelId(index)}"
              >
                ${name}
              </a>
            </li>
          `
        )}
      </ul>
      ${
        this.items.map(({ description }, index) =>
          html`
            <section id="${createTabpanelId(index)}">
              ${unsafeStatic(md.render(description))}
            </section>
          `
        )
      }
    `
  }
}

customElements.define("red-tabs", Tabs)
