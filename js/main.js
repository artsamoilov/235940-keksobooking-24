import {createHousingOffers} from './utils/data.js';
import {renderPopup} from './utils/map.js';
import {activateAll, deactivateAll} from './utils/form.js';

const HOUSING_QUANTITY = 10;
const housingOffers = createHousingOffers(HOUSING_QUANTITY);

renderPopup(housingOffers[0]);
deactivateAll();
activateAll();
