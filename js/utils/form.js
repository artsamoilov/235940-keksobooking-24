import {setEnabled} from './utils.js';
import {MinPrices, TokyoCoordinates} from './data.js';
import {sendAdvert} from './api.js';
import {resetMap} from './map.js';

const FORM_DISABILITY_CLASS = 'ad-form--disabled';
const adForm = document.querySelector('.ad-form');
const type = adForm.querySelector('#type');
const price = adForm.querySelector('#price');
const roomNumber = adForm.querySelector('#room_number');
const capacity = adForm.querySelector('#capacity');
const address = adForm.querySelector('#address');
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

resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  resetForm();
  resetMap();
});

const setFormEnabled = (enabled) => setEnabled(adForm, enabled, FORM_DISABILITY_CLASS);

type.addEventListener('change', () => {
  setPriceConstraint(type);
});

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

roomNumber.addEventListener('change', validateRooms);

capacity.addEventListener('change', validateRooms);

const setAdFormSubmit = (onSuccess, onError) => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    sendAdvert(onSuccess, onError, new FormData(evt.target));
  });
};

export {setAdFormSubmit, addCoordinates, setFormEnabled, resetForm};
