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
  if (titleLength < MIN_TITLE_LENGTH) {
    adFormTitle.setCustomValidity(`Ещё ${MIN_TITLE_LENGTH - titleLength} симв.`);
  } else if (titleLength > MAX_TITLE_LENGTH) {
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
  if (Number(adFormPrice.value) < minPrice) {
    adFormPrice.setCustomValidity(`Ещё ${Number(adFormPrice.min) - Number(adFormPrice.value)} руб. до минимальной цены`);
  } else if (Number(adFormPrice.value) > Number(adFormPrice.max)) {
    adFormPrice.setCustomValidity(`Максимальная цена превышена на ${Number(adFormPrice.value) - Number(adFormPrice.max)} руб.`);
  } else {
    adFormPrice.setCustomValidity('');
  }
  adFormPrice.reportValidity();
});

export {setFormEnabled};
