import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  bodyElement = document.querySelector('body')
  
  constructor() {
    // this.open
    // this.setTitle
    // this.setBody
    // this.close
  }
  open() {
    this.elem = renderModalElement(this.title, this.body)
    this.bodyElement.append(this.elem)
    this.bodyElement.classList.add('is-modal-open')
    escapeModal(this.elem)

  }
  setTitle(title) {
    this.title = title
    // if (!this.modal) {
    //   return
    // }
    // this.modal = renderModalElement(this.title,this.body)

  }

  setBody(node) {

    this.body = node
    // if (!this.modal) {
    //   return
    // }
    // this.modal = renderModalElement(this.title,this.body)
  }

  close() {
    if (!this.elem) {
      return
    }
    this.elem.remove()
  }
}

function renderModalElement(title, textNode) {
  // let container = document.createElement('div')
  // container.classList.add('container')
  let modalElement = document.createElement('div')
  modalElement.classList.add('modal')
  modalElement.innerHTML = `
    <div class="modal__overlay"></div>
    <div class="modal__inner">
      <div class="modal__header">
        <!--Кнопка закрытия модального окна-->
        <button type="button" class="modal__close">
          <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
        </button>

        <h3 class="modal__title">
          ${title}
        </h3>
      </div>
      <div class="modal__body">
        ${textNode.innerHTML}
      </div>
    </div>
  `
  // container.append(modalElement)
  return modalElement
}

const escapeModal = (modalElement) => {
  document.addEventListener('keydown', logKey);

  let bodyElement = document.querySelector('body')

  function logKey(e) {
  
    if (e.code=='Escape') {
      bodyElement.classList.remove('is-modal-open')
      modalElement.remove()
    }
    removeListener()
  } 

  const deleteButton = modalElement.querySelector('.modal__close')
  deleteButton.addEventListener('click', deleteModal)

  function deleteModal() {
      bodyElement.classList.remove('is-modal-open')
      modalElement.remove()
      removeListener()
  }

  function removeListener() {
    document.removeEventListener('keydown', logKey);
    document.removeEventListener('click', deleteModal);
  }

}