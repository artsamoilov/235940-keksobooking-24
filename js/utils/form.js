import {setEnabled} from './utils.js';
import {MinPrices} from './data.js';

const FORM_DISABILITY_CLASS = 'ad-form--disabled';
const adForm = document.querySelector('.ad-form');

const setFormEnabled = (enabled) => setEnabled(adForm, enabled, FORM_DISABILITY_CLASS);

const adFormTitle = adForm.querySelector('#title');
const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;

adFormTitle.addEventListener('input', () => {
  const titleLength = adFormTitle.value.length;
  if (adFormTitle.validity.tooShort) {
    adFormTitle.setCustomValidity(`Ещё ${MIN_TITLE_LENGTH - titleLength} симв.`);
  } else if (adFormTitle.validity.tooLong) {
    adFormTitle.setCustomValidity(`Удалите лишние ${titleLength - MAX_TITLE_LENGTH} симв.`);
  } else {
    adFormTitle.setCustomValidity('');
  }
  adFormTitle.reportValidity();
});

const adFormType = adForm.querySelector('#type');
const adFormPrice = adForm.querySelector('#price');
let minPrice = Number(adFormPrice.min);

adFormType.addEventListener('change', () => {
  minPrice = MinPrices[adFormType.value.toUpperCase()];
  adFormPrice.placeholder = minPrice;
  adFormPrice.min = minPrice;
});

adFormPrice.addEventListener('input', () => {
  if (adFormPrice.validity.valueMissing) {
    adFormPrice.setCustomValidity('Введите цену');
  } else if (adFormPrice.validity.rangeUnderflow) {
    adFormPrice.setCustomValidity(`Ещё ${Number(adFormPrice.min) - Number(adFormPrice.value)} руб. до минимальной цены`);
  } else if (adFormPrice.validity.rangeOverflow) {
    adFormPrice.setCustomValidity(`Максимальная цена превышена на ${Number(adFormPrice.value) - Number(adFormPrice.max)} руб.`);
  } else {
    adFormPrice.setCustomValidity('');
  }
  adFormPrice.reportValidity();
});

const adFormRoomNumber = adForm.querySelector('#room_number');
const adFormCapacity = adForm.querySelector('#capacity');

const validateRooms = () => {
  adFormCapacity.setCustomValidity('');
  if (Number(adFormRoomNumber.value) === 100) {
    if (Number(adFormCapacity.value) !== 0) {
      adFormCapacity.setCustomValidity('Доступно только не для гостей');
    }
  } else {
    if (Number(adFormCapacity.value) === 0) {
      adFormCapacity.setCustomValidity(`${adFormRoomNumber.value} комн. жильё доступно только для гостей`);
    } else if (Number(adFormCapacity.value) > Number(adFormRoomNumber.value)) {
      adFormCapacity.setCustomValidity(`В ${adFormRoomNumber.value} комн. можно разместить только ${adFormRoomNumber.value} чел.`);
    }
  }
  adFormCapacity.reportValidity();
};

adFormRoomNumber.addEventListener('change', validateRooms);

adFormCapacity.addEventListener('change', validateRooms);

export {setFormEnabled};
