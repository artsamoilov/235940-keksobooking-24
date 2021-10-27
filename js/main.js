import {map, initializeMap, setFilterEnabled} from './utils/map.js';
import {setAdFormSubmit, setFormEnabled} from './utils/form.js';
import {showSuccessModal, showErrorModal} from './utils/modal.js';
import {getData} from './utils/api.js';

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

getData(renderMap);

setAdFormSubmit(showSuccessModal, showErrorModal);
