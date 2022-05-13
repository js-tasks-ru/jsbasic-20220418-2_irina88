export default class ProductCard {
  constructor(product) {
    this.product = product
    this.elem = this.renderProductCard(product)
  }

  renderProductCard(product) {
    let elemCard = document.createElement('div')
    elemCard.classList.add('card')

    elemCard.innerHTML=`
    <div class="card__top">
      <img src="/assets/images/products/${product.image}" class="card__image" alt="product">
      <span class="card__price">€${product.price.toFixed(2)}</span>
    </div>
    <div class="card__body">
      <div class="card__title">${product.name}</div>
      <button type="button" class="card__button">
        <img src="/assets/images/icons/plus-icon.svg" alt="icon" class="aaa">
      </button>
    </div>`

    let button = elemCard.querySelector('.card__button')
    let event = new CustomEvent("product-add", { // имя события должно быть именно "product-add"
      detail: this.product.id, // Уникальный идентификатора товара из объекта товара
      bubbles: true // это событие всплывает - это понадобится в дальнейшем
    })
    
    button.addEventListener('click',({target})=>{
      target.dispatchEvent(event)
    })
    
    return elemCard
  }
}





