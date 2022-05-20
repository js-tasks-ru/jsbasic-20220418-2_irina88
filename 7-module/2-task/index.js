import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  bodyElement = document.body

  constructor() {
    this.modal = renderModalElement();
  }

  open() {
    this.bodyElement.append(this.modal);
    this.bodyElement.classList.add('is-modal-open');
    escapeModal(this.modal);
  }

  setTitle(title) {
    setTitleModal(title, this.modal);
  }

  setBody(node) {
    setBodyModal(node, this.modal);
  }

  close() {
    if (!this.modal) {
      return;
    }
    this.modal.remove();
    this.bodyElement.classList.remove('is-modal-open');
  }
}

function renderModalElement() {
  let modalElement = document.createElement('div');
  modalElement.classList.add('modal');
  modalElement.innerHTML = `
    <div class="modal__overlay"></div>
    <div class="modal__inner">
      <div class="modal__header">
        <!--Кнопка закрытия модального окна-->
        <button type="button" class="modal__close">
          <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
        </button>
        <h3 class="modal__title">
        </h3>
      </div>
      <div class="modal__body">
      </div>
    </div>
  `;
  return modalElement;
}

function setTitleModal(title, modalElement) {
  let titleField = modalElement.querySelector('.modal__title');
  titleField.textContent = `${title}`;
}

function setBodyModal(body, modalElement) {
  let titleField = modalElement.querySelector('.modal__body');
  titleField.append(body);
}

const escapeModal = (modalElement) => {
  document.addEventListener('keydown', logKey);
  let bodyElement = document.body;

  function logKey(e) {
  
    if (e.code == 'Escape') {
      bodyElement.classList.remove('is-modal-open');
      modalElement.remove();
    }
    removeListener();
  } 

  const deleteButton = modalElement.querySelector('.modal__close');
  deleteButton.addEventListener('click', deleteModal);

  function deleteModal() {
    bodyElement.classList.remove('is-modal-open');
    modalElement.remove();
    removeListener();
  }

  function removeListener() {
    document.removeEventListener('keydown', logKey);
    document.removeEventListener('click', deleteModal);
  }

};