function initCarousel() {
  let stepR = document.querySelector('.carousel__arrow_right')
  let stepL = document.querySelector('.carousel__arrow_left')
  stepL.style.display = 'none'

  let widthCurr = document.querySelector('.carousel__inner').offsetWidth
  let carouselTape = document.querySelector('.carousel__inner')
  let countFrames = Array.from(document.querySelectorAll('.carousel__slide')).length
  let position = 0
  
  stepR.addEventListener('click',(el)=>{
    position+=widthCurr
    carouselTape.style.transform = `translateX(-${position}px)`
    checkArrow()
  })
  stepL.addEventListener('click',(el)=>{
    position-=widthCurr
    carouselTape.style.transform = `translateX(-${position}px)`
    checkArrow()
  })
  
  function checkArrow() {
    position==(countFrames-1)*widthCurr
      ? stepR.style.display = 'none'
      : stepR.style.display = ''
  
    position==0
      ? stepL.style.display = 'none'
      : stepL.style.display = ''
  }
}
