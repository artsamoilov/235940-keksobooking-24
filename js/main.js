import {map, initializeMap, toggleFilterState, resetMap, checkMapFilter, updateMapMarkers, filterMaxNumberOfAdverts, createMarkers} from './modules/map.js';
import {toggleFormState, resetForm, setAdFormActions} from './modules/form.js';
import {showSuccessNotification, showErrorNotification, showLoadAdvertsErrorNotification} from './modules/notification.js';
import {loadAdverts} from './modules/api.js';
import {debounce} from './modules/utils.js';

const MAX_OFFERS_COUNT = 10;
const RENDERER_DELAY = 500;

const togglePageState = (enabled) => {
  toggleFilterState(enabled);
  toggleFormState(enabled);
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
  togglePageState(true);
  loadAdverts(setMapAdverts, showLoadAdvertsErrorNotification);
};

const renderMap = () => {
  togglePageState(false);
  map.addEventListener('load', onMapLoad);
  initializeMap();
};

renderMap();
