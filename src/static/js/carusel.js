import { html, css, LitElement } from "lit"

export class Carusel extends LitElement {

    static properties = {
        images: {
          type: Array
        },
    };

    static styles = css`p {
        color: red;
    }`

    constructor() {
        super()
        this.images = []
    }

    render() {
        return html`
            <ul>
              ${this.images.map(image =>
                html`<li><img src=${image}/></li>`
              )}
            </ul>
        `
    }
}

customElements.define("red-carusel", Carusel)
