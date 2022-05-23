export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.elem = renderStepSlider(steps, value);
    changeValueOfSlider(this.elem);
  }
}

function renderStepSlider(steps, value) {
  const slider = document.createElement('div');
  slider.classList.add('slider');
  slider.innerHTML = `
    <div class="slider__thumb" style="left: 50%;">
      <span class="slider__value"></span>
    </div>
    <div class="slider__progress" style="width: 50%;"></div>
    <div class="slider__steps">
      ${renderSteps(steps, value)}
    </div>
  `;
  return slider;
}

function renderSteps(steps, value) {
  let arraySteps = '<span class="slider__step-active"></span>';
  for (let i = value + 1; i < steps; i += 1) {
    arraySteps += '<span></span>';
  }
  
  return arraySteps;
}

function changeValueOfSlider(element) {
  const arraySlides = element.querySelector('.slider__steps').querySelectorAll('span');
  let countSlides = arraySlides.length;

  let thumb = element.querySelector('.slider__thumb');
  let progress = element.querySelector('.slider__progress');
  progress.style.width = `0%`;
  thumb.style.left = `0%`;
  

  element.addEventListener('click', ({ target, clientX }) => {
    arraySlides.forEach(span => {
      span.classList.remove('slider__step-active');
    });
    let { left: leftCoord, width: widthSlider } = element.getBoundingClientRect();
    let relativeX = clientX - leftCoord;
    let leftRelative = relativeX / widthSlider;
    let countSegments = countSlides - 1;
    let numberActiveSLide = Math.round(leftRelative * countSegments); 
    let percents = numberActiveSLide / countSegments * 100;
    console.log(Math.round(leftRelative * countSegments));

    thumb.style.left = `${percents}%`;
    progress.style.width = `${percents}%`;
    renderNewSlidePosition(element, numberActiveSLide);

    element.dispatchEvent(new CustomEvent('slider-change', { 
      detail: numberActiveSLide, 
      bubbles: true 
    }));
  });
}

function renderNewSlidePosition(element, numberActiveSLide) {
  let slides = element.querySelector('.slider__steps').querySelectorAll('span');
  console.log(slides);
  let activeSlide = slides[numberActiveSLide];
  activeSlide.classList.add('slider__step-active');
  console.log(activeSlide);
  activeSlide.classList.add('slider__step-active');

  let numberSlideElement = element.querySelector('.slider__value');
  numberSlideElement.innerHTML = numberActiveSLide;
}
