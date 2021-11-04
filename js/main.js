import {map, initializeMap, setFilterEnabled, resetMap, compareAdverts, checkMapFilter, updateMapMarkers} from './utils/map.js';
import {setAdFormSubmit, setFormEnabled, resetForm} from './utils/form.js';
import {showSuccessNotification, showErrorNotification} from './utils/notification.js';
import {loadAdverts} from './utils/api.js';
import {debounce} from './utils/debounce.js';

const MAX_OFFERS_COUNT = 10;
const RENDERER_DELAY = 500;

const setPageEnabled = (enabled) => {
  setFilterEnabled(enabled);
  setFormEnabled(enabled);
};

const renderMap = (offers) => {
  setPageEnabled(false);
  map.on('load', () => {
    setPageEnabled(true);
  });
  initializeMap(offers
    .slice()
    .sort(compareAdverts)
    .slice(0, MAX_OFFERS_COUNT));
  checkMapFilter(debounce(
    () => {updateMapMarkers(offers
      .slice()
      .sort(compareAdverts)
      .slice(0, MAX_OFFERS_COUNT));
    }, RENDERER_DELAY));
};

const onSuccess = () => {
  showSuccessNotification();
  resetMap();
  resetForm();
};

const onError = () => showErrorNotification();

loadAdverts(renderMap);

setAdFormSubmit(onSuccess, onError);
