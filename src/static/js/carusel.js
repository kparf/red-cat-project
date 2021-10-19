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

    :host {
      position: relative;
      --red-caruse-arrow-size: 24px;
      padding-left: calc(var(--red-caruse-arrow-size) + 1rem);
      padding-right: calc(var(--red-caruse-arrow-size) + 1rem);
    }
    .red-carusel__controls {
      display: flex;
      list-style: none;
      padding: 0;
      margin: 0;
    }
    .red-carusel__button {
      cursor: pointer;
      background: transparent;
      border: none;
      padding: 0;
    }
    .red-carusel__button:disabled {
      display: none;
    }

    .button-wrapper {
      position: absolute;
      box-sizing: border-box;
      display: flex;
      justify-content: center;
      height: 100%;
      padding: 0.5rem;
    }
    .button-wrapper.next {
      right: 0;
    }

    .button-wrapper.previous {
      left: 0;
    }

    .red-carusel__button-icon {
      width: var(--red-caruse-arrow-size);
      height: 100%;
      fill: var(--red-caruse-arrow-color, white);
    }

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
      scroll-snap-type: x;
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
      $scrollableContainer.scrollBy(-$scrollableContainer.offsetWidth, 0)
    }
  }

  _nextHandler() {
    const $scrollableContainer = this.scrollableContainer.value
    if ($scrollableContainer) {
      $scrollableContainer.scrollBy($scrollableContainer.offsetWidth, 0)
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
        <ul ${ref(this._disableButtons)} class="red-carusel__controls" aria-label="gallery controls">
          <li class="button-wrapper previous">
            <button
              aria-label="previous"
              class="red-carusel__button"
              @click="${this._previousHandler}"
              ${ref(this.previousButton)}
              disabled
            >
              <svg aria-hidden="true" viewBox="0 0 96 96" class="red-carusel__button-icon">
                <path transform="rotate(90 48 48)" d="M81.8457,25.3876a6.0239,6.0239,0,0,0-8.45.7676L48,56.6257l-25.396-30.47a5.999,5.999,0,1,0-9.2114,7.6879L43.3943,69.8452a5.9969,5.9969,0,0,0,9.2114,0L82.6074,33.8431A6.0076,6.0076,0,0,0,81.8457,25.3876Z" />
              </svg>
            </button>
          </li>
          <li class="button-wrapper next">
            <button
              aria-label="next"
              class="red-carusel__button"
              @click="${this._nextHandler}"
              ${ref(this.nextButton)}
              disabled
            >
              <svg aria-hidden="true" viewBox="0 0 96 96" class="red-carusel__button-icon">
                <path transform="rotate(-90 48 48)" d="M81.8457,25.3876a6.0239,6.0239,0,0,0-8.45.7676L48,56.6257l-25.396-30.47a5.999,5.999,0,1,0-9.2114,7.6879L43.3943,69.8452a5.9969,5.9969,0,0,0,9.2114,0L82.6074,33.8431A6.0076,6.0076,0,0,0,81.8457,25.3876Z" />
              </svg>
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
