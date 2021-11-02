const loadAdverts = (onSuccess) => {
  fetch('https://24.javascript.pages.academy/keksobooking/data')
    .then((response) => response.json())
    .then((offers) => onSuccess(offers));
};

const sendAdvert = (onSuccess, onError, body) => {
  fetch('https://24.javascript.pages.academy/keksobooking',
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
