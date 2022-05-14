import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this.render();
   
    
  }

  render() {
    this.elem = renderCarousel(this.slides);
    listener(this.elem);
  }
}

const renderCarousel = (slides) => {
    
  let carousel = document.createElement('div');
  carousel.classList.add('carousel');
  carousel.innerHTML = `
  <div class="carousel__arrow carousel__arrow_right">
    <img src="/assets/images/icons/angle-icon.svg" alt="icon">
  </div>
  <div class="carousel__arrow carousel__arrow_left">
    <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
  </div>
  `;
  let carousel__inner = document.createElement('div');
  carousel__inner.classList.add('carousel__inner');
  carousel__inner.dataset.position = 0;

  for (let i = 0; i < slides.length; i++) {
    let slide = document.createElement('div'); 
    slide.classList.add('carousel__slide');
    slide.dataset.id = slides[i].id;
    
    slide.innerHTML = `
    <img src="/assets/images/carousel/${slides[i].image}" class="carousel__img" alt="slide">
      <div class="carousel__caption">
        <span class="carousel__price">€${slides[i].price.toFixed(2)}</span>
        <div class="carousel__title">${slides[i].name}</div>
        <button type="button" class="carousel__button">
          <img src="/assets/images/icons/plus-icon.svg" alt="icon">
        </button>
      </div>
    `;
    carousel__inner.append(slide);
  }
  carousel.append(carousel__inner);
  
  return carousel;
};

function listener (element) {

  let stepR = element.querySelector('.carousel__arrow_right');
  let stepL = element.querySelector('.carousel__arrow_left');
  stepL.style.display = 'none';

  let arrows = [stepR, stepL];

  let countFrames = element.querySelectorAll('.carousel__slide').length;

  arrows.forEach(arrow => {
    arrow.addEventListener('click', (el)=>{
      let carousel__inner = element.querySelector('.carousel__inner');
      let position = +carousel__inner.dataset.position;
      let widthCurr = carousel__inner.offsetWidth;
      
      arrow == stepR ? position += widthCurr : position -= widthCurr;

      carousel__inner.dataset.position = position;

      carousel__inner.style.transform = `translateX(-${position}px)`;
      checkArrow(widthCurr, position);
    });
  });

  let slides = element.querySelectorAll('.carousel__slide');
  slides.forEach(slide => {
    let button = slide.querySelector('.carousel__button');
    let event = new CustomEvent("product-add", { // имя события должно быть именно "product-add"
      detail: slide.dataset.id, // Уникальный идентификатора товара из объекта товара
      bubbles: true // это событие всплывает - это понадобится в дальнейшем
    });
    button.addEventListener('click', ({target})=>{
      target.dispatchEvent(event);
    });
  });
  
  function checkArrow(widthCurr, position) {
    position == (countFrames - 1) * widthCurr
      ? stepR.style.display = 'none'
      : stepR.style.display = '';

    position == 0
      ? stepL.style.display = 'none'
      : stepL.style.display = '';
  }
}




