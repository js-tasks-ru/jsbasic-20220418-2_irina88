import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.renderElem(this.categories);
  }
  renderElem(categories) {
    this.elem = renderRibbonMenu(categories);
    eventListener(this.elem);
  }


}

function renderRibbonMenu(categories) {
  const ribbon = document.createElement('div');
  ribbon.classList.add('ribbon');
  ribbon.append(renderArrow('ribbon__arrow_left'));
  ribbon.append(renderInnerRibbon(categories));
  ribbon.append(renderArrow('ribbon__arrow_right'));
  return ribbon;
}

//ribbon__arrow_visible
function renderArrow(direction) {
  const arrow = document.createElement('button');
  arrow.classList.add(`ribbon__arrow`);
  arrow.classList.add(`${direction}`);
  arrow.classList.add(`ribbon__arrow_visible`);
  arrow.innerHTML = `<img src="/assets/images/icons/angle-icon.svg" alt="icon">`;
  return arrow;
}

function renderInnerRibbon(categories) {
  const ribbonInner = document.createElement('nav');
  ribbonInner.classList.add(`ribbon__inner`);

  categories.forEach(({id, name}) => {
    ribbonInner.innerHTML += `<a href="#" class="ribbon__item" data-id=${id}>${name}</a>`;
  });

  return ribbonInner;
}

function eventListener(element) {
  activeListener(element);
  scrollRibbon(element);
}

function activeListener(element) {

  element.addEventListener(('click'), (event) => {
    event.preventDefault();
    let ribbonItems = Array.from(element.querySelectorAll('.ribbon__item'));

    ribbonItems.forEach(item => {
      item.classList.remove('ribbon__item_active');  
    });

    if (event.target.classList.contains('ribbon__item')) {
      event.target.classList.toggle('ribbon__item_active');
      const selectedType = new CustomEvent('ribbon-select', { // имя события должно быть именно 'ribbon-select'
        detail: event.target.dataset.id, // уникальный идентификатора категории из её объекта
        bubbles: true // это событие всплывает - это понадобится в дальнейшем
      });
      element.dispatchEvent(selectedType);
    }

  });

}

function scrollRibbon(element) {
  const ribbonInner = element.querySelector('.ribbon__inner');
  let stepRight = element.querySelector('.ribbon__arrow_right');
  let stepLeft = element.querySelector('.ribbon__arrow_left');
  let arrows = [stepRight, stepLeft];

  arrows.forEach(arrow => {
    arrow.addEventListener('click', () => {
      if (arrow == stepRight) 
      {ribbonInner.scrollBy(350, 0);}
      else {ribbonInner.scrollBy(-350, 0);}
      checkArrow();
    });
  });

  function checkArrow(arrow) {
    let scrollWidth = ribbonInner.scrollWidth;
    let scrollLeft = ribbonInner.scrollLeft;
    let clientWidth = ribbonInner.clientWidth;

    let rightPosition = scrollWidth - scrollLeft - clientWidth; 
    let leftPosition = ribbonInner.scrollLeft;
    
    if (leftPosition == 0)
    {stepLeft.classList.remove('ribbon__arrow_visible');}
    else {stepLeft.classList.add('ribbon__arrow_visible');}
    
    if (Math.floor(rightPosition) == 0)
    {stepRight.classList.remove('ribbon__arrow_visible');}
    else {stepRight.classList.add('ribbon__arrow_visible');}
  }
}
