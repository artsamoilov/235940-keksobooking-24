import {isEscKey} from './utils.js';

const MODAL_SHOW_TIME = 3000;
const successNotificationTemplate = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
const errorNotificationTemplate = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
const modalContainer = document.createElement('div');

const hideNotification = () => {
  modalContainer.remove();
  document.removeEventListener('keydown', isEscKey);
};

const onDocumentEscKeydown = (evt) => {
  if (isEscKey(evt)) {
    evt.preventDefault();
    hideNotification();
  }
};

const showNotification = (modal) => {
  modalContainer.append(modal);
  document.body.append(modalContainer);
  modal.addEventListener('click', () => hideNotification());
  document.addEventListener('keydown', onDocumentEscKeydown);

  setTimeout(() => hideNotification(), MODAL_SHOW_TIME);
};

const showSuccessNotification = () => {
  showNotification(successNotificationTemplate);
};

const showErrorNotification = () => {
  showNotification(errorNotificationTemplate);
};

export {showSuccessNotification, showErrorNotification};
