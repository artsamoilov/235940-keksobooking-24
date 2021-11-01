import {isEscKey} from './utils.js';

const NOTIFICATION_SHOW_TIME = 30000;
const successNotificationTemplate = document.querySelector('#success').content.querySelector('.success');
const errorNotificationTemplate = document.querySelector('#error').content.querySelector('.error');

const onDocumentEscKeydown = (evt) => {
  if (isEscKey(evt)) {
    evt.preventDefault();
    hideNotification();
  }
};

const onDocumentClick = () => hideNotification();

function hideNotification () {
  if (document.querySelector('.success')) {
    document.querySelector('.success').remove();
  }
  if (document.querySelector('.error')) {
    document.querySelector('.error').remove();
  }
  document.removeEventListener('click', onDocumentClick);
  document.removeEventListener('keydown', onDocumentEscKeydown);
}

const showNotification = (notificationTemplate) => {
  document.body.append(notificationTemplate);
  document.addEventListener('click', onDocumentClick);
  document.addEventListener('keydown', onDocumentEscKeydown);
  setTimeout(hideNotification, NOTIFICATION_SHOW_TIME);
};

const showSuccessNotification = () => showNotification(successNotificationTemplate.cloneNode(true));

const showErrorNotification = () => showNotification(errorNotificationTemplate.cloneNode(true));

export {showSuccessNotification, showErrorNotification};
