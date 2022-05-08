function toggleText() {
  let text = document.querySelector('#text')

  document.addEventListener('click', (el)=>{
    if (el.target.classList.contains('toggle-text-button')) {
      hideOffOn(text)
    }
  })
}

function hideOffOn(elem) {

  if (elem.getAttribute('hidden')){
    elem.removeAttribute('hidden')
  } else {
    elem.setAttribute('hidden',true)
  }

}