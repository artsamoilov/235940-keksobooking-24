import {setEnabled} from './utils.js';

const FORM_DISABILITY_CLASS = 'ad-form--disabled';
const adForm = document.querySelector('.ad-form');

const setFormEnabled = (enabled) => setEnabled(adForm, enabled, FORM_DISABILITY_CLASS);

export {setFormEnabled};
