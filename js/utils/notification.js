import {isEscKey} from './utils.js';

const NOTIFICATION_SHOW_TIME = 3000;

const hideNotification = () => {
  if (document.querySelector('.success')) {
    document.querySelector('.success').remove();
  }
  if (document.querySelector('.error')) {
    document.querySelector('.error').remove();
  }
  document.removeEventListener('keydown', isEscKey);
};

const onDocumentEscKeydown = (evt) => {
  if (isEscKey(evt)) {
    evt.preventDefault();
    hideNotification();
  }
};

const showNotification = (notificationTemplate) => {
  document.body.append(notificationTemplate);
  notificationTemplate.addEventListener('click', hideNotification);
  document.addEventListener('keydown', onDocumentEscKeydown);

  setTimeout(hideNotification, NOTIFICATION_SHOW_TIME);
};

const showSuccessNotification = () => {
  const successNotificationTemplate = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
  showNotification(successNotificationTemplate);
};

const showErrorNotification = () => {
  const errorNotificationTemplate = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
  showNotification(errorNotificationTemplate);
};

export {showSuccessNotification, showErrorNotification};
