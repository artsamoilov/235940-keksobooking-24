import {setEnabled} from './utils.js';
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

const addCoordinates = ({lat, lng}) => addressNode.value = `${lat.toFixed(5)}, ${lng.toFixed(5)}`;

const setPriceConstraint = (housingTypeNode) => {
  priceNode.placeholder = MinPrices[housingTypeNode.value.toUpperCase()];
  priceNode.min = MinPrices[housingTypeNode.value.toUpperCase()];
};

const resetForm = () => {
  adFormNode.reset();
  addCoordinates({lat: TokyoCoordinates.LAT, lng: TokyoCoordinates.LNG});
  setPriceConstraint(typeNode);
};

const setFormEnabled = (enabled) => setEnabled(adFormNode, enabled, FORM_DISABILITY_CLASS);

const validateRooms = () => {
  const roomNumberValue = Number(roomNumberNode.value);
  const capacityValue = Number(capacityNode.value);
  capacityNode.setCustomValidity('');
  if (roomNumberValue === 100) {
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

const onTimeChange = (evt) => evt.target === timeOutNode ? timeInNode.value = evt.target.value : timeOutNode.value = evt.target.value;

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

export {addCoordinates, setFormEnabled, resetForm, setAdFormActions};
