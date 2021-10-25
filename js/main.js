import {createHousingOffers} from './utils/data.js';
import {map, initializeMap, setFilterEnabled} from './utils/map.js';
import {setFormEnabled} from './utils/form.js';

const HOUSING_QUANTITY = 10;
const housingOffers = createHousingOffers(HOUSING_QUANTITY);

const setPageEnabled = (enabled) => {
  setFilterEnabled(enabled);
  setFormEnabled(enabled);
};

const renderMap = (offers) => {
  setPageEnabled(false);
  map.on('load', () => {
    setPageEnabled(true);
  });
  initializeMap(offers);
};

renderMap(housingOffers);
