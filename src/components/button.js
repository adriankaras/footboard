const template = document.createElement('template');

template.innerHTML = `
  <style>
    .container {
      padding: 8px;
    }

    button {
      display: block;
      overflow: hidden;
      position: relative;
      padding: 0 16px;
      font-size: 16px;
      font-weight: bold;
      text-overflow: ellipsis;
      white-space: nowrap;
      cursor: pointer;
      outline: none;
      width: 100%;
      height: 40px;
      box-sizing: border-box;
      border: 1px solid #a1a1a1;
      background: #ffffff;
      box-shadow: 0 2px 4px 0 rgba(0,0,0, 0.05), 0 2px 8px 0 rgba(161,161,161, 0.4);
      color: #363636;
    }
  </style>

  <div class="container">
    <button>
      <slot>Label</slot>
    </button>
  </div>
`;

export class Button extends HTMLElement {
  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._shadowRoot.appendChild(template.content.cloneNode(true));
  }

  /**
   * Runs each time the element is mounted or moved in the DOM
   */
  connectedCallback () {
    console.log('connected!', this);
    this.addEventListener('click', this.onclick);
  }

  /**
   * Runs when the element is removed from the DOM
   */
  disconnectedCallback () {
    console.log('disconnected', this);
    this.removeEventListener('click', this.onclick);
  }

  static get observedAttributes() {
    return ['disabled'];
  }
  set disabled(bool) {
    this.setAttribute('disabled', bool.toString());
  }

  get disabled() {
    return this.getAttribute('disabled') === 'true';
  }

  attributeChangedCallback(attrName, oldVal, newVal) {
    switch (attrName) {
      case 'disabled': {
        console.log('xxx this', this.disabled);
        // this.shadowRoot.getElementById('button').disabled = newVal === 'true';
        this.shadowRoot.getElementById('button').disabled = newVal === 'true';
        break;
      }
      default: {
        console.log('unhandled attribute change', attrName, oldVal, newVal);
        break;
      }
    }
  }

  onclick(event) {
    const button = this;

    if (event.composedPath().includes(button)) {
      console.log('button clicked');
      this.dispatchEvent(new CustomEvent('custom-click', {
        detail: 'test value',
        composed: true,
      }));
    }
  }
}
