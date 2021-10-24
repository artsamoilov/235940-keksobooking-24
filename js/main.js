import {createHousingOffers} from './utils/data.js';
import {renderPopup, setFilterEnabled} from './utils/map.js';
import {setFormEnabled} from './utils/form.js';

const HOUSING_QUANTITY = 10;
const housingOffers = createHousingOffers(HOUSING_QUANTITY);

renderPopup(housingOffers[0]);

const setPageEnabled = (enabled) => {
  setFilterEnabled(enabled);
  setFormEnabled(enabled);
};

setPageEnabled(true);
