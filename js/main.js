import {createHousingOffers} from './utils/data.js';
import {renderPopup} from './utils/map.js';

const HOUSING_QUANTITY = 10;
const housingOffers = createHousingOffers(HOUSING_QUANTITY);

renderPopup(housingOffers[0]);
