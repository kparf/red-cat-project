import { html, css, LitElement } from "lit"

export class Carusel extends LitElement {

    static properties = {
        text: {},
    };

    static styles = css`p {
        color: red;
    }`

    constructor() {
        super()
    }

    render() {
        return html`
            <p>
                Hello, ${this.text}
            </p>
        `
    }
}

customElements.define("red-carusel", Carusel)