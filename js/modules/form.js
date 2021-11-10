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

const adForm = document.querySelector('.ad-form');
const type = adForm.querySelector('#type');
const price = adForm.querySelector('#price');
const roomNumber = adForm.querySelector('#room_number');
const capacity = adForm.querySelector('#capacity');
const address = adForm.querySelector('#address');
const time = adForm.querySelector('.ad-form__element--time');
const timeIn = adForm.querySelector('#timein');
const timeOut = adForm.querySelector('#timeout');
const resetButton = adForm.querySelector('.ad-form__reset');

const addCoordinates = ({lat, lng}) => address.value = `${lat.toFixed(5)}, ${lng.toFixed(5)}`;

const setPriceConstraint = (housingType) => {
  price.placeholder = MinPrices[housingType.value.toUpperCase()];
  price.min = MinPrices[housingType.value.toUpperCase()];
};

const resetForm = () => {
  adForm.reset();
  addCoordinates({lat: TokyoCoordinates.LAT, lng: TokyoCoordinates.LNG});
  setPriceConstraint(type);
};

const setFormEnabled = (enabled) => setEnabled(adForm, enabled, FORM_DISABILITY_CLASS);

const validateRooms = () => {
  const roomNumberValue = Number(roomNumber.value);
  const capacityValue = Number(capacity.value);
  capacity.setCustomValidity('');
  if (roomNumberValue === 100) {
    if (capacityValue !== 0) {
      capacity.setCustomValidity('Доступно только не для гостей');
    }
  } else {
    if (capacityValue === 0) {
      capacity.setCustomValidity(`${roomNumberValue} комн. жильё доступно только для гостей`);
    } else if (capacityValue > roomNumberValue) {
      capacity.setCustomValidity(`В ${roomNumberValue} комн. можно разместить только ${roomNumberValue} чел.`);
    }
  }
  capacity.reportValidity();
};

const onRoomCapacityChange = () => validateRooms();

const onHousingTypeChange = () => setPriceConstraint(type);

const onTimeChange = (evt) => evt.target === timeOut ? timeIn.value = evt.target.value : timeOut.value = evt.target.value;

time.addEventListener('change', onTimeChange);

type.addEventListener('change', onHousingTypeChange);

roomNumber.addEventListener('change', onRoomCapacityChange);

capacity.addEventListener('change', onRoomCapacityChange);

const setAdFormSubmit = (onSuccess, onError, adverts) => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    sendAdvert(onSuccess, onError, new FormData(evt.target));
    updateMapMarkers(adverts);
  });
};

const setAdFormReset = (adverts) => {
  resetButton.addEventListener('click', (evt) => {
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
