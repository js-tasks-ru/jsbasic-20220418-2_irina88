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
  ribbon.append(renderArrow('ribbon__arrow_left'), renderInnerRibbon(categories), renderArrow('ribbon__arrow_right'));
  ribbon.querySelector('.ribbon__arrow_left').classList.remove('ribbon__arrow_visible');
  return ribbon;
}

//ribbon__arrow_visible
function renderArrow(direction) {
  const button = createElement(`
  <button class="ribbon__arrow ${direction} ribbon__arrow_visible">
    <img src="/assets/images/icons/angle-icon.svg" alt="icon">
  </button>
  `);
  return button;
}

function renderInnerRibbon(categories) {

  const ribbonInner = createElement(`
  <nav class="ribbon__inner">
  ${getLinks()}
  </nav>
  `);

  function getLinks() {
    let link = '';
    categories.forEach(({id, name}) => {
      if (name === 'All') {
        link += `<a href="#" class="ribbon__item ribbon__item_active" data-id=${id}>${name}</a>`;
      } else {
        link += `<a href="#" class="ribbon__item" data-id=${id}>${name}</a>`;
      }
      
    });
    return link;
  }

  return ribbonInner;
}

function eventListener(element) {
  activeListener(element);
  scrollRibbon(element);
}

function activeListener(element) {

  element.addEventListener(('click'), (event) => {
    event.preventDefault();
    let ribbonItems = element.querySelectorAll('.ribbon__item');

    ribbonItems.forEach(item => {
      item.classList.remove('ribbon__item_active');  
    });

    if (event.target.classList.contains('ribbon__item')) {
      event.target.classList.toggle('ribbon__item_active');
      const selectedType = new CustomEvent('ribbon-select', {
        detail: event.target.dataset.id, 
        bubbles: true 
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
      if (arrow === stepRight) 
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
    console.log(leftPosition);
    console.log(rightPosition);
    
    if (Math.floor(leftPosition) === 0)
    {stepLeft.classList.toggle('ribbon__arrow_visible');}
    
    if (Math.floor(rightPosition) === 0)
    {stepRight.classList.toggle('ribbon__arrow_visible');}
  }
}
