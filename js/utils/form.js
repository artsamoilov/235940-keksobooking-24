import {setEnabled} from './utils.js';
import {MinPrices} from './data.js';

const FORM_DISABILITY_CLASS = 'ad-form--disabled';
const adForm = document.querySelector('.ad-form');
const adFormType = adForm.querySelector('#type');
const adFormPrice = adForm.querySelector('#price');
const adFormRoomNumber = adForm.querySelector('#room_number');
const adFormCapacity = adForm.querySelector('#capacity');

const setFormEnabled = (enabled) => setEnabled(adForm, enabled, FORM_DISABILITY_CLASS);

adFormType.addEventListener('change', () => {
  const minPrice = MinPrices[adFormType.value.toUpperCase()];
  adFormPrice.placeholder = minPrice;
  adFormPrice.min = minPrice;
});

const validateRooms = () => {
  const roomNumber = Number(adFormRoomNumber.value);
  const roomCapacity = Number(adFormCapacity.value);
  adFormCapacity.setCustomValidity('');
  if (roomNumber === 100) {
    if (roomCapacity !== 0) {
      adFormCapacity.setCustomValidity('Доступно только не для гостей');
    }
  } else {
    if (roomCapacity === 0) {
      adFormCapacity.setCustomValidity(`${roomNumber} комн. жильё доступно только для гостей`);
    } else if (roomCapacity > roomNumber) {
      adFormCapacity.setCustomValidity(`В ${roomNumber} комн. можно разместить только ${roomNumber} чел.`);
    }
  }
  adFormCapacity.reportValidity();
};

adFormRoomNumber.addEventListener('change', validateRooms);

adFormCapacity.addEventListener('change', validateRooms);

export {setFormEnabled};
