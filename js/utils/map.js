import {createPopup} from './popup.js';

const renderPopup = (offer) => document.querySelector('#map-canvas').append(createPopup(offer));

const mapFilter = document.querySelector('.map__filters');

const changeMapFilterDisability = (filter, disable, mapFilterDisabilityClass) => {
  disable ? filter.classList.add(mapFilterDisabilityClass) : filter.classList.remove(mapFilterDisabilityClass);
  filter.childNodes.forEach((element) => element.disabled = disable);
};

export {renderPopup, mapFilter, changeMapFilterDisability};
