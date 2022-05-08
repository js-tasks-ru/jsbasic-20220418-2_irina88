function hideSelf() {
  document.addEventListener('click', (el)=>{

    let hideBtn = el.target
    if (hideBtn.classList.contains('hide-self-button')){
      hideBtn.setAttribute('hidden',true)
    }

  })
}
