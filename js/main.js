import {map, initializeMap, setFilterEnabled, resetMap} from './utils/map.js';
import {setAdFormSubmit, setFormEnabled, resetForm} from './utils/form.js';
import {showSuccessNotification, showErrorNotification} from './utils/notification.js';
import {loadAdverts} from './utils/api.js';

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

const onSuccess = () => {
  showSuccessNotification();
  resetMap();
  resetForm();
};

const onError = () => showErrorNotification();

loadAdverts(renderMap);

setAdFormSubmit(onSuccess, onError);
