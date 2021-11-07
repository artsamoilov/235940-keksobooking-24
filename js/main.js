import {map, initializeMap, setFilterEnabled, resetMap, checkMapFilter, updateMapMarkers, filterAdverts} from './modules/map.js';
import {setFormEnabled, resetForm, setAdFormActions} from './modules/form.js';
import {showSuccessNotification, showErrorNotification} from './modules/notification.js';
import {loadAdverts} from './modules/api.js';
import {debounce} from './modules/debounce.js';

const MAX_OFFERS_COUNT = 10;
const RENDERER_DELAY = 500;

const setPageEnabled = (enabled) => {
  setFilterEnabled(enabled);
  setFormEnabled(enabled);
};

const onSuccess = () => {
  showSuccessNotification();
  resetMap();
  resetForm();
};

const onError = () => showErrorNotification();

const onMapLoad = (adverts) => {
  setPageEnabled(true);
  checkMapFilter(debounce(() => {updateMapMarkers(adverts
    .slice()
    .filter(filterAdverts)
    .slice(0, MAX_OFFERS_COUNT));
  }, RENDERER_DELAY));
  setAdFormActions(onSuccess, onError, adverts
    .slice()
    .slice(0, MAX_OFFERS_COUNT));
};

const renderMap = (adverts) => {
  setPageEnabled(false);
  map.addEventListener('load', () => onMapLoad(adverts));
  initializeMap(adverts.slice(0, MAX_OFFERS_COUNT));
};

loadAdverts(renderMap);
