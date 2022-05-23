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
  let carouselInner = document.createElement('div');
  carouselInner.classList.add('carousel__inner');
  carouselInner.dataset.position = 0;

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
    carouselInner.append(slide);
  }
  carousel.append(carouselInner);
  
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
      let carouselInner = element.querySelector('.carousel__inner');
      let position = +carouselInner.dataset.position;
      let widthCurr = carouselInner.offsetWidth;
      
      if (arrow === stepR) 
      { position += widthCurr; }
      else 
      { position -= widthCurr; }
      
      carouselInner.dataset.position = position;

      carouselInner.style.transform = `translateX(-${position}px)`;
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
    if (position === (countFrames - 1) * widthCurr)
    {stepR.style.display = 'none';}
    else {stepR.style.display = '';}

    if (position === 0)
    {stepL.style.display = 'none';}
    else {stepL.style.display = '';}
  }
}




