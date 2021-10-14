import {createHousingOffers} from './utils/data.js';
import {createPopup} from './utils/card.js';
import {getIntegerFromRange} from './utils/utils.js';

const HOUSING_QUANTITY = 10;
const housingOffers = createHousingOffers(HOUSING_QUANTITY);

createPopup(housingOffers[getIntegerFromRange(0, HOUSING_QUANTITY - 1)]);
