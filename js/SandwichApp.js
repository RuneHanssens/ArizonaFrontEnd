import MyCustomElement from './MyCustomElement.js';
import './sandwichesList.js';
import './SandwichOrder.js';

class SandwichApp extends MyCustomElement{
  connectedCallback(){
    super.connectedCallback()
    this.setupEventListeners()
  }

  setupEventListeners(){
    this.addEventListener('order', (e) => this.orderSandwich(e.detail))
    this.addEventListener('confirm', (e) => this.confirmOrder(e.detail))
  }

  get template(){
    return `
      <style>
        .hidden {display:none}
      </style>
      <sandwich-list></sandwich-list>
      <sandwich-order class="hidden"></sandwich-order>
    `
  }

  orderSandwich(sandwich){
    this.shadowRoot.querySelector('sandwich-list').classList.add('hidden')
    this.shadowRoot.querySelector('sandwich-order').classList.remove('hidden')
    this.shadowRoot.querySelector('sandwich-order').setSandwich(sandwich)
  }

  confirmOrder(order){
    //post to backend
  }
}


customElements.define('sandwich-app', SandwichApp);
