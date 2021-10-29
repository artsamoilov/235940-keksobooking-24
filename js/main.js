import {map, initializeMap, setFilterEnabled} from './utils/map.js';
import {setAdFormSubmit, setFormEnabled} from './utils/form.js';
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

loadAdverts(renderMap);

setAdFormSubmit(showSuccessNotification, showErrorNotification);
