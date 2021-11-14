import {isEscKey} from './utils.js';

const NOTIFICATION_SHOW_TIME = 3000;
const SUCCESS_NODE_CLASS = '.success';
const ERROR_NODE_CLASS = '.error';

const mainNode = document.querySelector('main');
const successNotificationTemplateNode = document.querySelector('#success').content.querySelector(SUCCESS_NODE_CLASS);
const errorNotificationTemplateNode = document.querySelector('#error').content.querySelector(ERROR_NODE_CLASS);
let controller = new AbortController();

const hideNotification = () => {
  if (document.querySelector(SUCCESS_NODE_CLASS)) {
    document.querySelector(SUCCESS_NODE_CLASS).remove();
  }
  if (document.querySelector(ERROR_NODE_CLASS)) {
    document.querySelector(ERROR_NODE_CLASS).remove();
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

const showSuccessNotification = () => showNotification(successNotificationTemplateNode.cloneNode(true));

const showErrorNotification = () => showNotification(errorNotificationTemplateNode.cloneNode(true));

const showLoadAdvertsErrorNotification = () => {
  const errorMessageNode = document.createElement('p');
  errorMessageNode.classList.add('adverts-load-error__message');
  errorMessageNode.textContent = 'При загрузке объявлений произошла ошибка. Пожалуйста перезагрузите страницу.';
  mainNode.appendChild(errorMessageNode);
};

export {showSuccessNotification, showErrorNotification, showLoadAdvertsErrorNotification};
