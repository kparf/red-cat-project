import { html, css, LitElement } from "lit"
import { ref, createRef } from 'lit/directives/ref.js';
import debounce from "lodash/debounce"

const DEBOUNCED_TIME = 200
export class Carusel extends LitElement {

  static properties = {
      images: { type: Array },
      ratio: { type: Number }
  };

  static styles = css`

    .red-carusel {
      position: relative;
    }

    .red-carusel__list {
      display: flex;
      list-style: none;
      padding: 0;
      margin: 0;
      white-space: nowrap;
      height: 100%;
    }

    .red-carusel__list-item {
      width: 100%;
      flex-shrink: 0;
    }

    .red-carusel__list-item > * {
      scroll-snap-align: center;
      height: 100%;
      width: 100%;
    }

    .red-carusel__list-item + .red-carusel__list-item {
      margin-left: 3rem;
    }

    .red-carusel__scrollable {
      position: absolute;
      top: 0;
      width: 100%;
      height: 100%;
      overflow-x: auto;
      scroll-behavior: smooth;
      scroll-snap-type: x mandatory;
      scrollbar-width: none;
    }

    .red-carusel__scrollable::-webkit-scrollbar {
      height: 0;
    }
  `

  constructor() {
      super()
      this.images = []
      this.ratio = 1
  }

  scrollableContainer = createRef()
  list = createRef()
  previousButton = createRef()
  nextButton = createRef()

  _disableButtons = debounce(() => {
    const $scrollableContainer = this.scrollableContainer.value
    const $list = this.list.value
    const $previousButton = this.previousButton.value
    const $nextButton = this.nextButton.value

    if ($scrollableContainer && $previousButton) {
      $previousButton.disabled = $scrollableContainer.scrollLeft < 1
    }
    if ($scrollableContainer && $nextButton && $list) {
      $nextButton.disabled =  $list.scrollWidth - $list.offsetWidth - $scrollableContainer.scrollLeft < 2
    }
  }, DEBOUNCED_TIME)

  debounced = undefined
  _scrollHandler() {

    this._disableButtons()
  }

  _previousHandler() {
    const $scrollableContainer = this.scrollableContainer.value
    if ($scrollableContainer) {
      $scrollableContainer.scrollBy(-$scrollableContainer.offsetWidth / 2, 0)
    }
  }

  _nextHandler() {
    const $scrollableContainer = this.scrollableContainer.value
    if ($scrollableContainer) {
      $scrollableContainer.scrollBy($scrollableContainer.offsetWidth / 2, 0)
    }
  }

  render() {
      return html`
        <style>
          .red-carusel {
            padding-top: calc(1 / ${this.ratio} * 100%);
            height: 0;
          }
        </style>
        <ul aria-label="gallery controls">
          <li>
            <button
              @click="${this._previousHandler}"
              ${ref(this.previousButton)}
            >
              Previous
            </button>
          </li>
          <li>
            <button
              @click="${this._nextHandler}"
              ${ref(this.nextButton)}
            >
              Next
            </button>
          </li>
        </ul>
        <div class="red-carusel" role="group" aria-label="gallery">
          <div
            @scroll="${this._scrollHandler}"
            ${ref(this.scrollableContainer)}
            class="red-carusel__scrollable"
          >
            <ul ${ref(this.list)} class="red-carusel__list" tabindex="0">
              ${this.images.map(image =>
                html`<li class="red-carusel__list-item"><img src=${image}/></li>`
              )}
            </ul>
          </div>
        </div>
      `
  }
}

customElements.define("red-carusel", Carusel)
