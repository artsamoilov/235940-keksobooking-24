const API_URL = 'https://24.javascript.pages.academy/keksobooking';

const loadAdverts = (onSuccess, onError) => {
  fetch(`${API_URL}/data`)
    .then((response) => response.json())
    .then((offers) => onSuccess(offers))
    .catch(onError);
};

const sendAdvert = (onSuccess, onError, body) => {
  fetch(API_URL,
    {
      method: 'POST',
      body,
    },
  ).then((response) => {
    if (response.ok) {
      onSuccess();
    } else {
      throw new Error();
    }
  }).catch(onError);
};

export {loadAdverts, sendAdvert};
