const HousingTypes = {
  BUNGALOW: 'Бунгало',
  FLAT: 'Квартира',
  HOTEL: 'Отель',
  HOUSE: 'Дом',
  PALACE: 'Дворец',
};

const addExistingTextContent = (node, text) => text ? node.textContent = text : node.classList.add('hidden');

const addExistingSource = (node, source) => source ? node.src = source : node.classList.add('hidden');

const createPopup = ({author: {avatar}, offer: {title, address, price, type, rooms, guests, checkin, checkout, features, description, photos}}) => {
  const cardTemplateNode = document.querySelector('#card').content.querySelector('.popup').cloneNode(true);
  const popupFeaturesContainerNode = cardTemplateNode.querySelector('.popup__features');
  const popupPhotosContainerNode = cardTemplateNode.querySelector('.popup__photos');

  addExistingSource(cardTemplateNode.querySelector('.popup__avatar'), avatar);
  addExistingTextContent(cardTemplateNode.querySelector('.popup__title'), title);
  addExistingTextContent(cardTemplateNode.querySelector('.popup__text--address'), address);
  addExistingTextContent(cardTemplateNode.querySelector('.popup__text--price'), `${price} ₽/ночь`);
  addExistingTextContent(cardTemplateNode.querySelector('.popup__type'), HousingTypes[type]);
  addExistingTextContent(cardTemplateNode.querySelector('.popup__text--capacity'), `${rooms} комнаты для ${guests} гостей`);
  addExistingTextContent(cardTemplateNode.querySelector('.popup__text--time'), `Заезд после ${checkin}, выезд до ${checkout}`);
  addExistingTextContent(cardTemplateNode.querySelector('.popup__description'), description);

  if (features) {
    const featuresNodes = popupFeaturesContainerNode.querySelectorAll('.popup__feature');
    const featuresClasses = features.map((feature) => `popup__feature--${feature}`);
    featuresNodes.forEach((featureNode) => {
      const featureClass = featureNode.classList[1];
      if (!featuresClasses.includes(featureClass)) {
        featureNode.remove();
      }
    });
  } else {
    popupFeaturesContainerNode.classList.add('hidden');
  }

  if (photos) {
    const photoTemplateNode = popupPhotosContainerNode.querySelector('.popup__photo');
    photos.forEach((photoSource) => {
      const photoNode = photoTemplateNode.cloneNode();
      photoNode.src = photoSource;
      popupPhotosContainerNode.append(photoNode);
    });
    photoTemplateNode.remove();
  } else {
    popupPhotosContainerNode.remove();
  }

  return cardTemplateNode;
};

export {createPopup};
