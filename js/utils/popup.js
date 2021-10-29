import {HousingTypes} from './data.js';

const addExistingTextContent = (node, text) => text ? node.textContent = text : node.classList.add('hidden');

const addExistingSource = (node, source) => source ? node.src = source : node.classList.add('hidden');

const createPopup = ({author: {avatar}, offer: {title, address, price, type, rooms, guests, checkin, checkout, features, description, photos}}) => {
  const cardTemplate = document.querySelector('#card').content.querySelector('.popup').cloneNode(true);
  const popupFeaturesContainer = cardTemplate.querySelector('.popup__features');
  const popupPhotosContainer = cardTemplate.querySelector('.popup__photos');

  addExistingSource(cardTemplate.querySelector('.popup__avatar'), avatar);
  addExistingTextContent(cardTemplate.querySelector('.popup__title'), title);
  addExistingTextContent(cardTemplate.querySelector('.popup__text--address'), address);
  addExistingTextContent(cardTemplate.querySelector('.popup__text--price'), `${price} ₽/ночь`);
  addExistingTextContent(cardTemplate.querySelector('.popup__type'), HousingTypes[type]);
  addExistingTextContent(cardTemplate.querySelector('.popup__text--capacity'), `${rooms} комнаты для ${guests} гостей`);
  addExistingTextContent(cardTemplate.querySelector('.popup__text--time'), `Заезд после ${checkin}, выезд до ${checkout}`);
  addExistingTextContent(cardTemplate.querySelector('.popup__description'), description);

  if (features) {
    const featuresList = popupFeaturesContainer.querySelectorAll('.popup__feature');
    const featuresClasses = features.map((feature) => `popup__feature--${feature}`);
    featuresList.forEach((featureItem) => {
      const featureClass = featureItem.classList[1];
      if (!featuresClasses.includes(featureClass)) {
        featureItem.remove();
      }
    });
  } else {
    popupFeaturesContainer.classList.add('hidden');
  }

  if (photos) {
    const photoTemplate = popupPhotosContainer.querySelector('.popup__photo');
    photos.forEach((photoSource) => {
      const photoElement = photoTemplate.cloneNode();
      photoElement.src = photoSource;
      popupPhotosContainer.append(photoElement);
    });
    photoTemplate.remove();
  } else {
    popupPhotosContainer.remove();
  }

  return cardTemplate;
};

export {createPopup};
