import {createHousingOffers} from './utils/data.js';
import {mapFilter, renderPopup, changeMapFilterDisability} from './utils/map.js';
import {adForm, changeFormDisability} from './utils/form.js';

const HOUSING_QUANTITY = 10;
const housingOffers = createHousingOffers(HOUSING_QUANTITY);

renderPopup(housingOffers[0]);

const FORM_DISABILITY_CLASS = 'ad-form--disabled';
const MAP_FILTER_DISABILITY_CLASS = 'map__filters--disabled';

changeFormDisability(adForm, true, FORM_DISABILITY_CLASS);
changeFormDisability(adForm, false, FORM_DISABILITY_CLASS);
changeMapFilterDisability(mapFilter, true, MAP_FILTER_DISABILITY_CLASS);
changeMapFilterDisability(mapFilter, false, MAP_FILTER_DISABILITY_CLASS);
