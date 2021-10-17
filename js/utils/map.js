import {createPopup} from './popup.js';

const renderPopup = (offer) => document.querySelector('#map-canvas').append(createPopup(offer));

export {renderPopup};
