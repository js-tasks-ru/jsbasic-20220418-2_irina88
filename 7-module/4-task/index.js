export default class StepSlider {
  constructor({ steps }) {
    this.elem = renderStepSlider(steps);
    changeValueOfSlider(this.elem);
    //changeOfDragAndDrop(this.elem)
  }
}

function renderStepSlider(steps) {
  const slider = document.createElement('div');
  slider.classList.add('slider');
  slider.innerHTML = `
    <div class="slider__thumb" style="left: 50%;">
      <span class="slider__value">0</span>
    </div>
    <div class="slider__progress" style="width: 50%;"></div>
    <div class="slider__steps">
      ${renderSteps(steps)}
    </div>
  `;
  return slider;
}

function renderSteps(steps) {
  let arraySteps = '<span class="slider__step-active"></span>';
  for (let i = 1; i < steps; i += 1) {
    arraySteps += '<span></span>';
  }
  
  return arraySteps;
}

function changeValueOfSlider(element) {
  
  const arraySlides = element.querySelector('.slider__steps').querySelectorAll('span');
  let countSlides = arraySlides.length;

  let thumb = element.querySelector('.slider__thumb');
  thumb.ondragstart = () => false;
  let progress = element.querySelector('.slider__progress');
  progress.style.width = `0%`;
  thumb.style.left = `0%`;
  let numberActiveSLide = 0;
  let countSegments = countSlides - 1;

  const changePosition = ({ clientX }) => {
    arraySlides.forEach(span => {
      span.classList.remove('slider__step-active');
    });
    let { left: leftCoord, width: widthSlider } = element.getBoundingClientRect();
    let relativeX = clientX - leftCoord;
    let leftRelative = relativeX / widthSlider;
    
    numberActiveSLide = Math.round(leftRelative * countSegments); 
    let percents = numberActiveSLide / countSegments * 100;

    thumb.style.left = `${percents}%`;
    progress.style.width = `${percents}%`;
    renderNewSlidePosition(element, numberActiveSLide);

    element.dispatchEvent(new CustomEvent('slider-change', { 
      detail: numberActiveSLide, 
      bubbles: true 
    }));
  };

  element.addEventListener('click', changePosition);


  element.addEventListener('pointerdown', () => {
    let numberSlideElement = element.querySelector('.slider__value');
    const onMove = ({ clientX }) => {
      
      element.classList.add('slider_dragging');
      let { left: leftCoordMove, width: widthSliderMove } = element.getBoundingClientRect();
      let relativeXMove = clientX - leftCoordMove;
      let leftRelativeMove = relativeXMove / widthSliderMove;
      numberActiveSLide = leftRelativeMove * countSegments; 
  
      let percents = numberActiveSLide / countSegments * 100;

      if (numberActiveSLide >= 0 && numberActiveSLide <= 4)
      {numberSlideElement.innerHTML = numberActiveSLide;}

      if (percents <= 100 && percents >= 0) 
      {
        numberSlideElement.innerHTML = Math.round(numberActiveSLide);
        thumb.style.left = `${percents}%`;
        progress.style.width = `${percents}%`;
      }

    };

    document.addEventListener('pointermove', onMove);
  
    document.addEventListener('pointerup', ({ target, clientX }) => {    
      element.dispatchEvent(new CustomEvent('slider-change', { 
        detail: Math.round(numberActiveSLide), 
        bubbles: true 
      }));  
      element.classList.remove('slider_dragging');
      document.removeEventListener('pointermove', onMove);
    }, { once: true });

  });

}

function renderNewSlidePosition(element, numberActiveSLide) {
  let slides = element.querySelector('.slider__steps').querySelectorAll('span');
  let activeSlide = slides[numberActiveSLide];
  activeSlide.classList.add('slider__step-active');
  activeSlide.classList.add('slider__step-active');

  let numberSlideElement = element.querySelector('.slider__value');
  numberSlideElement.innerHTML = numberActiveSLide;
}