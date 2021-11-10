import {map, initializeMap, setFilterEnabled, resetMap, checkMapFilter, updateMapMarkers, filterMaxNumberOfAdverts, createMarkers} from './modules/map.js';
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

const setMapAdverts = (adverts) => {
  createMarkers(adverts.slice(0, MAX_OFFERS_COUNT));
  checkMapFilter(debounce(() => {
    updateMapMarkers(filterMaxNumberOfAdverts(adverts, MAX_OFFERS_COUNT));
  }, RENDERER_DELAY));
  setAdFormActions(onSuccess, onError, adverts.slice(0, MAX_OFFERS_COUNT));
};

const onMapLoad = () => {
  setPageEnabled(true);
  loadAdverts(setMapAdverts);
};

const renderMap = () => {
  setPageEnabled(false);
  map.addEventListener('load', onMapLoad);
  initializeMap();
};

renderMap();
