export default class StepSlider {
  constructor({ steps, value = 3}) {
    this.elem = renderStepSlider(steps, value);
    changeValueOfSlider(this.elem);
  }
}

function renderStepSlider(steps, value) {
  const slider = document.createElement('div');
  slider.classList.add('slider');
  slider.innerHTML = `
    <div class="slider__thumb" style="left: 50%;">
      <span class="slider__value">${value}</span>
    </div>
    <div class="slider__progress" style="width: 50%;"></div>
    <div class="slider__steps">
      ${renderSteps(steps, value)}
    </div>
  `;
  let thumb = slider.querySelector('.slider__thumb');
  let progress = slider.querySelector('.slider__progress');
  progress.style.width = `${value / (steps - 1) * 100}%`;
  thumb.style.left = `${value / (steps - 1) * 100}%`;
  return slider;
}

function renderSteps(steps, value) {
  let arraySteps = '';
  for (let i = 0; i < steps; i += 1) {
    if (i === value) {
      arraySteps += '<span class="slider__step-active"></span>';
    } else {
      arraySteps += '<span></span>';
    }
  }
  
  return arraySteps;
}

function changeValueOfSlider(element) {
  
  const arraySlides = element.querySelector('.slider__steps').querySelectorAll('span');
  let countSlides = arraySlides.length;

  let thumb = element.querySelector('.slider__thumb');
  thumb.ondragstart = () => false;
  let progress = element.querySelector('.slider__progress');
  let numberActiveSLide = 0;
  let countSegments = countSlides - 1;

  const changePosition = ({ clientX }) => {
    arraySlides.forEach(span => {
      span.classList.remove('slider__step-active');
    });
    numberActiveSLide = Math.round(getNumberSLide(clientX));
    let percents = numberActiveSLide / countSegments * 100;

    setCoordinates(percents);
    renderNewSlidePosition(element, numberActiveSLide);

    element.dispatchEvent(new CustomEvent('slider-change', { 
      detail: numberActiveSLide, 
      bubbles: true 
    }));
  };

  element.addEventListener('click', changePosition);

  function setCoordinates(percents) {
    thumb.style.left = `${percents}%`;
    progress.style.width = `${percents}%`;
  }

  function getNumberSLide(clientX) {
    let { left: leftCoord, width: widthSlider } = element.getBoundingClientRect();
    let relativeX = clientX - leftCoord;
    let leftRelative = relativeX / widthSlider;
    numberActiveSLide = leftRelative * countSegments; 
    return numberActiveSLide;
  }

  element.addEventListener('pointerdown', () => {
    let numberSlideElement = element.querySelector('.slider__value');
    const onMove = ({ clientX }) => {
      arraySlides.forEach(span => {
        span.classList.remove('slider__step-active');
      });
      element.classList.add('slider_dragging');
      numberActiveSLide = getNumberSLide(clientX);
      let percents = numberActiveSLide / countSegments * 100;

      if (numberActiveSLide >= 0 && numberActiveSLide <= 4)
      {numberSlideElement.innerHTML = numberActiveSLide;}

      if (percents <= 100 && percents >= 0) 
      {
        numberSlideElement.innerHTML = Math.round(numberActiveSLide);
        thumb.style.left = `${percents}%`;
        progress.style.width = `${percents}%`;
        renderNewSlidePosition(element, Math.round(numberActiveSLide));
      }
      
    };

    document.addEventListener('pointermove', onMove);
  
    document.addEventListener('pointerup', ({ target, clientX }) => {   
      let percents = Math.round(getNumberSLide(clientX)) / countSegments * 100;
      
      if (percents <= 100 && percents >= 0) 
      {
        setCoordinates(percents);
        renderNewSlidePosition(element, Math.round(getNumberSLide(clientX)));
      }
      
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
  let numberSlideElement = element.querySelector('.slider__value');
  numberSlideElement.innerHTML = numberActiveSLide;
}