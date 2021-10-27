import {isEscKey} from './utils.js';

const MODAL_SHOW_TIME = 3000;
const modalSuccess = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
const modalError = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
const modalContainer = document.createElement('div');

const closeModal = () => {
  modalContainer.remove();
  document.removeEventListener('keydown', isEscKey);
};

const onModalEscKeydown = (evt) => {
  if (isEscKey(evt)) {
    evt.preventDefault();
    closeModal();
  }
};

const showModal = (modal) => {
  modalContainer.append(modal);
  document.body.append(modalContainer);
  modal.addEventListener('click', () => closeModal());
  document.addEventListener('keydown', onModalEscKeydown);

  setTimeout(() => closeModal(), MODAL_SHOW_TIME);
};

const showSuccessModal = () => {
  showModal(modalSuccess);
};

const showErrorModal = () => {
  showModal(modalError);
};

export {showSuccessModal, showErrorModal};
