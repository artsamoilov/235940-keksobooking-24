import {createPopup} from './popup.js';
import {setEnabled} from './utils.js';

const renderPopup = (offer) => document.querySelector('#map-canvas').append(createPopup(offer));

const MAP_FILTER_DISABILITY_CLASS = 'map__filters--disabled';
const mapFilter = document.querySelector('.map__filters');

const setFilterEnabled = (enabled) => setEnabled(mapFilter, enabled, MAP_FILTER_DISABILITY_CLASS);

export {renderPopup, setFilterEnabled};
