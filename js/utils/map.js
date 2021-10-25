import {createPopup} from './popup.js';
import {setEnabled} from './utils.js';

const MAP_FILTER_DISABILITY_CLASS = 'map__filters--disabled';
const mapFilter = document.querySelector('.map__filters');
const map = L.map('map-canvas').setView({
  lat: 35.68,
  lng: 139.74,
}, 13);
const markerGroup = L.layerGroup().addTo(map);

const setFilterEnabled = (enabled) => setEnabled(mapFilter, enabled, MAP_FILTER_DISABILITY_CLASS);

const createOfferMarker = (offer) => {
  const markerIcon = L.icon({
    iconUrl: './img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });
  const pin = L.marker({
    lat: offer.location.lat,
    lng: offer.location.lng,
  },
  {
    icon: markerIcon,
  });
  pin.addTo(markerGroup).bindPopup(createPopup(offer));
};

const createMarkers = (offers) => {
  offers.forEach((offer) => {
    createOfferMarker(offer);
  });
};

const initializeMap = (offers) => {
  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);
  const mainMarkerIcon = L.icon({
    iconUrl: './img/main-pin.svg',
    iconSize: [52, 52],
    iconAnchor: [26, 52],
  });
  const mainMarker = L.marker(
    {
      lat: 35.68,
      lng: 139.74,
    },
    {
      draggable: true,
      icon: mainMarkerIcon,
    },
  );
  mainMarker.on('moveend', (evt) => {
    console.log(evt.target.getLatLng());
  });
  mainMarker.addTo(map);
  createMarkers(offers);
};

export {initializeMap, setFilterEnabled};
