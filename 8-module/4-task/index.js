import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';

import Modal from '../../7-module/2-task/index.js';

export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;

    this.addEventListeners();
  }

  addProduct(product) {
    if (!product) {
      return;
    }
    let newProduct;

    if (!wasAdded(this.cartItems, product)) {
      newProduct = {
        product,
        count: 1,
      };
      this.cartItems.push(newProduct);
      
    } else {
     
      const index = this.cartItems.findIndex((item) => item.product.id === product.id);
      newProduct = this.cartItems[index];
      newProduct.count += 1;
      this.cartItems = [...this.cartItems.slice(0, index), newProduct, ...this.cartItems.slice(index + 1)];
    }

    this.onProductUpdate(newProduct);
  }

  updateProductCount(productId, amount) {
    const index = this.cartItems.findIndex((element) => element.product.id === productId);
    
    let newProduct = this.cartItems[index];
    let newCount = newProduct.count += amount;
    if (newCount === 0) {
      this.cartItems = [...this.cartItems.slice(0, index), ...this.cartItems.slice(index + 1)];
    } else {
      newProduct.count = newCount;
      this.cartItems = [...this.cartItems.slice(0, index), newProduct, ...this.cartItems.slice(index + 1)];
    }
    this.onProductUpdate(newProduct);    
  }

  isEmpty() {
    return this.cartItems.length === 0;
  }

  getTotalCount() {
    let totalCount = this.cartItems.reduce((count, element) => {
      return count + element.count;
    }, 0);
    return totalCount;
  }

  getTotalPrice() {
    let totalPrice = this.cartItems.reduce((price, element) => {
      return price + (element.product.price * element.count);
    }, 0);
    return totalPrice;
  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${
  product.id
}">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${(product.price * count).toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(
    2
  )}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderModal() {
    this.modal = new Modal();
    this.modal.setTitle('Your order');
    let bodyModal = document.createElement('div');
    this.cartItems.forEach(item => {
      //let productRow = this.renderProduct(item.product,item.count)
      bodyModal.append(this.renderProduct(item.product, item.count));
      //this.changeCountListener(productRow)
    });
    bodyModal.append(this.renderOrderForm());
    this.modal.setBody(bodyModal);
    this.changeModalListener(bodyModal);
    this.modal.open();
  }

  onProductUpdate(cartItem) {
    console.log(cartItem.product.price * cartItem.count);
    if (!this.modal) {
      this.cartIcon.update(this);
      return;
    }
    let modalBody = this.modal.modal;
    let productId = cartItem.product.id;


    if (cartItem.count === 0) {
      console.log('yea');
      const cartItemElement = modalBody.querySelector(`[data-product-id="${productId}"]`);
      cartItemElement.remove();
    } else {
      console.log('kek');
      const productCount = modalBody.querySelector(`[data-product-id="${productId}"] .cart-counter__count`);
      const productPrice = modalBody.querySelector(`[data-product-id="${productId}"] .cart-product__price`);

      productCount.innerHTML = cartItem.count;
      productPrice.innerHTML = `€${(cartItem.product.price * cartItem.count).toFixed(2)}`;
      console.log(cartItem.product.price * cartItem.count);
    }

    if (modalBody.querySelectorAll('[data-product-id]').length === 0) {
      this.modal.close();
      // delete this.modal;
      this.cartIcon.update(this);
      return;
    }

    let infoPrice = modalBody.querySelector(`.cart-buttons__info-price`);
    infoPrice.innerHTML = `€${this.getTotalPrice().toFixed(2)}`;
    this.cartIcon.update(this);
  }

  onSubmit(event) {
    event.preventDefault();
    this.modal.modal.querySelector('button[type="submit"]').classList.add('is-loading');

    const dataBodyForFetch = new FormData(event.target);

    fetch('https://httpbin.org/post', {
      method: 'POST',
      body: dataBodyForFetch
    })
    .then(() => {
      this.modal.setTitle('Success!');
      this.cartItems = [];
      const newModalBody = createElement(`
      <div class="modal__body-inner">
        <p>
          Order successful! Your order is being cooked :) <br>
          We’ll notify you about delivery time shortly.<br>
          <img src="/assets/images/delivery.gif">
        </p>
      </div>
      `);
      this.modal.setBody(newModalBody);
    });
    this.cartIcon.update(this);
  }

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }

  changeModalListener(bodyModal) {
    const cartProducts = bodyModal.querySelectorAll('.cart-product');
    cartProducts.forEach((product) => {
      const productId = product.dataset.productId;
      // const buttonElementPlus = product.querySelector(`cart-counter__button_plus`);
      // const buttonElementMinus = product.querySelector(`cart-counter__button_plus`);
      // buttonElementPlus.addEventListener('click', ({ target }) => {
      //   this.updateProductCount(productId, 1);
      // })
      // buttonElementMinus.addEventListener('click', ({ target }) => {
      //   this.updateProductCount(productId, -1);
      // })
      product.addEventListener('click', ({ target }) => {
        if (target.parentNode.classList.contains('cart-counter__button_minus') && target.tagName === 'IMG') {
          this.updateProductCount(productId, -1);
        }

        if (target.parentNode.classList.contains('cart-counter__button_plus') && target.tagName === 'IMG') {
          this.updateProductCount(productId, 1);
        }
      });
    });

    const formCart = bodyModal.querySelector('.cart-form');
    formCart.addEventListener('submit', (event) => {
      this.onSubmit(event);
    });
  }
}

function wasAdded(arrayProducts, product) {
  return arrayProducts.find((element) => element.product.id === product.id);
}