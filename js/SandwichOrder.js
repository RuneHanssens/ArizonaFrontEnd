import MyCustomElement from './MyCustomElement.js'

class SandwichOrder extends MyCustomElement{
  connectedCallback(){
    super.connectedCallback()
  }

  setSandwich(sandwich){
    let sandwichElement = document.createElement('div')
    sandwichElement.innerHTML = this.sandwichTemplate(sandwich);
    this.shadowRoot.getElementById('order').insertBefore(sandwichElement, this.shadowRoot.getElementById('order').firstChild)
    //this.shadowRoot.getElementById('confirm').addEventListener('click', () => document.querySelector('sandwich-app').dispatchEvent(new CustomEvent('confirm', {detail:sandwich})))
    this.shadowRoot.getElementById('confirm').addEventListener('click', () => this.confirm(sandwich) )
  }

  confirm(sandwich){
    let mobilePhoneNumber = this.shadowRoot.getElementById('phoneNumber').value
    let breadType = this.shadowRoot.querySelector('input[name="breadType"]:checked').value
    let order = {
      mobilePhoneNumber: mobilePhoneNumber,
      breadType: breadType,
      sandwichId: sandwich.id,
      price: sandwich.price,
      name: sandwich.name
    }
    document.querySelector('sandwich-app').dispatchEvent(new CustomEvent('confirm', {detail:order}))
  }

  sandwichTemplate(sandwich){
      return `
            <div>
              <h3>${sandwich.name}</h3>
              <p>${sandwich.ingredients}</p>
              <p>€ ${sandwich.price}</p>
            </div>
      `
  }
  get template(){
    return `<div id="order">
              <input type="radio" name="breadType" value="Turkish bread" checked="checked"> Turkish bread
              <input type="radio" name="breadType" value="Wrap"> Wrap
              <input type="radio" name="breadType" value="Boterhammekes"> Boterhammekes
              <label for="phoneNumber">Phonenumber:</label>
              <input type="text" name="phoneNumber" id="phoneNumber"/>
              <button id="confirm">Confirm order</button>
            </div>`
  }
}
customElements.define('sandwich-order', SandwichOrder);
