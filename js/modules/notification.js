import {isEscKey} from './utils.js';

const NOTIFICATION_SHOW_TIME = 3000;

const successNotificationTemplate = document.querySelector('#success').content.querySelector('.success');
const errorNotificationTemplate = document.querySelector('#error').content.querySelector('.error');
let controller = new AbortController();

const hideNotification = () => {
  if (document.querySelector('.success')) {
    document.querySelector('.success').remove();
  }
  if (document.querySelector('.error')) {
    document.querySelector('.error').remove();
  }
  controller.abort();
};

const onDocumentEscKeydown = (evt) => {
  if (isEscKey(evt)) {
    evt.preventDefault();
    hideNotification();
  }
};

const onDocumentClick = () => hideNotification();

const showNotification = (notificationTemplate) => {
  controller = new AbortController();
  document.body.append(notificationTemplate);
  document.addEventListener('click', onDocumentClick, {signal: controller.signal});
  document.addEventListener('keydown', onDocumentEscKeydown, {signal: controller.signal});
  setTimeout(hideNotification, NOTIFICATION_SHOW_TIME);
};

const showSuccessNotification = () => showNotification(successNotificationTemplate.cloneNode(true));

const showErrorNotification = () => showNotification(errorNotificationTemplate.cloneNode(true));

export {showSuccessNotification, showErrorNotification};
