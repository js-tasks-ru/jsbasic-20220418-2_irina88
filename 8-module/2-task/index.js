import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};
    this.elem = this.#renderProductGrid(products);
  }

  #renderProductGrid() {
    let filteredProduct = this.products.filter((product) => {
      return this.#filterProduct(product, this.filters);
    });
    
    const productGrid = document.createElement('div');
    productGrid.classList.add('products-grid');
    const productsGridInner = document.createElement('div');
    productsGridInner.classList.add('products-grid__inner');

    filteredProduct.forEach(element => {
      let productElement = new ProductCard(element);
      productsGridInner.append(productElement.elem);
    });
    productGrid.append(productsGridInner);
    return productGrid;
  }

  updateFilter(filters) {
    this.elem.innerHTML = '';
    this.filters = {...this.filters, ...filters};
    this.elem.append(this.#renderProductGrid());
  }

  #filterProduct(product, filter) {
  
    let consilience = true;
    const filters = Object.entries(filter);
    filters.forEach(([condition, value]) => {
      consilience = consilience && checkFilter[condition](value, product); 
    });
    return consilience;
  }

}

const checkFilter = {
  noNuts: (value, product) => {

    if (!value) {
      return true;
    }   
    return product.nuts !== value;
  },

  vegeterianOnly: (value, product) => {
    if (!value) {
      return true;
    }      
    return product.vegeterian === value;
  },

  maxSpiciness: (value, product) => {
    return product.spiciness <= value;
  },

  category: (value, product) => {
    if (value === '') {
      return true;
    }
    return product.category === value;
  },
};
