import {toggleNodeState} from './utils.js';
import {TokyoCoordinates} from './utils.js';
import {sendAdvert} from './api.js';
import {resetMap, updateMapMarkers} from './map.js';

const MinPrices = {
  BUNGALOW: 0,
  FLAT: 1000,
  HOTEL: 3000,
  HOUSE: 5000,
  PALACE: 10000,
};
const FORM_DISABILITY_CLASS = 'ad-form--disabled';
const PHOTO_FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const ROOMS_NOT_FOR_GUESTS_VALUE = 100;

const adFormNode = document.querySelector('.ad-form');
const typeNode = adFormNode.querySelector('#type');
const priceNode = adFormNode.querySelector('#price');
const roomNumberNode = adFormNode.querySelector('#room_number');
const capacityNode = adFormNode.querySelector('#capacity');
const addressNode = adFormNode.querySelector('#address');
const timeNode = adFormNode.querySelector('.ad-form__element--time');
const timeInNode = adFormNode.querySelector('#timein');
const timeOutNode = adFormNode.querySelector('#timeout');
const resetButtonNode = adFormNode.querySelector('.ad-form__reset');
const photoListContainerNode = adFormNode.querySelector('.ad-form__photo-container');
const photoFileChooserNode = photoListContainerNode.querySelector('#images');
const photoContainerTemplateNode = photoListContainerNode.querySelector('.ad-form__photo');
const avatarFileChooserNode = adFormNode.querySelector('#avatar');
const avatarPreviewNode = adFormNode.querySelector('.ad-form-header__preview img');
const defaultAvatarURL = avatarPreviewNode.src;

const isFileTypeMatches = (file) => {
  const fileName = file.name.toLowerCase();
  return PHOTO_FILE_TYPES.some((extension) => fileName.endsWith(extension));
};

const setDefaultAvatarPreview = () => avatarPreviewNode.src = defaultAvatarURL;

avatarFileChooserNode.addEventListener('change', () => {
  const file = avatarFileChooserNode.files[0];
  avatarPreviewNode.src = isFileTypeMatches(file) ? URL.createObjectURL(file) : defaultAvatarURL;
});

const isPhotoContainerEmpty = () => photoListContainerNode.querySelectorAll('.ad-form__photo').length === 0;

const removePhotoPreview = () => {
  const currentPhotoPreviewsNodes = photoListContainerNode.querySelectorAll('.ad-form__photo');
  currentPhotoPreviewsNodes.forEach((currentPreviewNode) => currentPreviewNode.remove());
};

const setDefaultPhotoPreview = () => photoListContainerNode.appendChild(photoContainerTemplateNode);

photoFileChooserNode.addEventListener('change', () => {
  removePhotoPreview();
  const files = photoFileChooserNode.files;
  for (let i = 0; i < files.length; i++) {
    if (isFileTypeMatches(files[i])) {
      const photoContainerNode = photoContainerTemplateNode.cloneNode();
      const photoNode = document.createElement('img');
      photoNode.src = URL.createObjectURL(files[i]);
      photoNode.alt = `Фото жилья ${photoListContainerNode.children.length}`;
      photoContainerNode.appendChild(photoNode);
      photoListContainerNode.appendChild(photoContainerNode);
    }
  }
  if (isPhotoContainerEmpty()) {
    setDefaultPhotoPreview();
  }
});

const resetPreview = () => {
  setDefaultAvatarPreview();
  removePhotoPreview();
  setDefaultPhotoPreview();
};

const addCoordinates = ({lat, lng}) => addressNode.value = `${lat.toFixed(5)}, ${lng.toFixed(5)}`;

const setPriceConstraint = (housingTypeNode) => {
  priceNode.placeholder = MinPrices[housingTypeNode.value.toUpperCase()];
  priceNode.min = MinPrices[housingTypeNode.value.toUpperCase()];
};

const resetForm = () => {
  adFormNode.reset();
  addCoordinates({lat: TokyoCoordinates.LAT, lng: TokyoCoordinates.LNG});
  setPriceConstraint(typeNode);
  resetPreview();
};

const toggleFormState = (enabled) => toggleNodeState(adFormNode, enabled, FORM_DISABILITY_CLASS);

const validateRooms = () => {
  const roomNumberValue = Number(roomNumberNode.value);
  const capacityValue = Number(capacityNode.value);
  capacityNode.setCustomValidity('');
  if (roomNumberValue === ROOMS_NOT_FOR_GUESTS_VALUE) {
    if (capacityValue !== 0) {
      capacityNode.setCustomValidity('Доступно только не для гостей');
    }
  } else {
    if (capacityValue === 0) {
      capacityNode.setCustomValidity(`${roomNumberValue} комн. жильё доступно только для гостей`);
    } else if (capacityValue > roomNumberValue) {
      capacityNode.setCustomValidity(`В ${roomNumberValue} комн. можно разместить только ${roomNumberValue} чел.`);
    }
  }
  capacityNode.reportValidity();
};

const onRoomCapacityChange = () => validateRooms();

const onHousingTypeChange = () => setPriceConstraint(typeNode);

const onTimeChange = (evt) => {
  if (evt.target === timeOutNode) {
    timeInNode.value = evt.target.value;
  } else {
    timeOutNode.value = evt.target.value;
  }
};

timeNode.addEventListener('change', onTimeChange);

typeNode.addEventListener('change', onHousingTypeChange);

roomNumberNode.addEventListener('change', onRoomCapacityChange);

capacityNode.addEventListener('change', onRoomCapacityChange);

const setAdFormSubmit = (onSuccess, onError, adverts) => {
  adFormNode.addEventListener('submit', (evt) => {
    evt.preventDefault();
    sendAdvert(onSuccess, onError, new FormData(evt.target));
    updateMapMarkers(adverts);
  });
};

const setAdFormReset = (adverts) => {
  resetButtonNode.addEventListener('click', (evt) => {
    evt.preventDefault();
    resetForm();
    resetMap();
    updateMapMarkers(adverts);
  });
};

const setAdFormActions = (onSuccess, onError, adverts) => {
  setAdFormReset(adverts);
  setAdFormSubmit(onSuccess, onError, adverts);
};

export {addCoordinates, toggleFormState, resetForm, setAdFormActions};
