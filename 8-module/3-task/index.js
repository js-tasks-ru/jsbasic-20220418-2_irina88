export default class Cart {
  cartItems = []; // [product: {...}, count: N] список товаров

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
  }

  addProduct(product) {
    if (!product) {return;}
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

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
    
  }
}

function wasAdded(arrayProducts, product) {
  return arrayProducts.find((element) => element.product.id === product.id);
}

