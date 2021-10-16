import {createHousingOffers} from './utils/data.js';
import {createPopup} from './utils/popup.js';

const HOUSING_QUANTITY = 10;
const housingOffers = createHousingOffers(HOUSING_QUANTITY);

createPopup(housingOffers[0]);
