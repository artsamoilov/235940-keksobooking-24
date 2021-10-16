import {HOUSING_TYPES} from './data.js';

const createPopup = (housing) => {
  const cardTemplate = document.querySelector('#card').content.querySelector('.popup');
  const popupPhotosContainer = cardTemplate.querySelector('.popup__photos');
  const photoTemplate = popupPhotosContainer.querySelector('.popup__photo');

  const addExistingTextContent = (node, text) => text ? node.textContent = text : node.classList.add('hidden');
  const addExistingSource = (node, source) => source ? node.src = source : node.classList.add('hidden');

  addExistingSource(cardTemplate.querySelector('.popup__avatar'), housing.author.avatar);
  addExistingTextContent(cardTemplate.querySelector('.popup__title'), housing.offer.title);
  addExistingTextContent(cardTemplate.querySelector('.popup__text--address'), housing.offer.address);
  addExistingTextContent(cardTemplate.querySelector('.popup__text--price'), `${housing.offer.price} ₽/ночь`);
  addExistingTextContent(cardTemplate.querySelector('.popup__type'), HOUSING_TYPES[housing.offer.type]);
  addExistingTextContent(cardTemplate.querySelector('.popup__text--capacity'), `${housing.offer.rooms} комнаты для ${housing.offer.guests} гостей`);
  addExistingTextContent(cardTemplate.querySelector('.popup__text--time'), `Заезд после ${housing.offer.checkin}, выезд до ${housing.offer.checkout}`);
  addExistingTextContent(cardTemplate.querySelector('.popup__description'), housing.offer.description);

  const popupFeaturesContainer = cardTemplate.querySelector('.popup__features');
  const featuresList = popupFeaturesContainer.querySelectorAll('.popup__feature');
  const featuresClasses = housing.offer.features.map((feature) => `popup__feature--${feature}`);

  featuresList.forEach((featureItem) => {
    const featureClass = featureItem.classList[1];
    if (!featuresClasses.includes(featureClass)) {
      featureItem.remove();
    }
  });

  housing.offer.photos.forEach((photoSource) => {
    const photoElement = photoTemplate.cloneNode();
    photoElement.src = photoSource;
    popupPhotosContainer.append(photoElement);
  });
  photoTemplate.remove();

  document.querySelector('#map-canvas').append(cardTemplate);
};

export {createPopup};
