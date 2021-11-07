import {createPopup} from './popup.js';
import {setEnabled} from './utils.js';
import {addCoordinates} from './form.js';
import {TokyoCoordinates} from './utils.js';

const MAP_FILTER_DISABILITY_CLASS = 'map__filters--disabled';
const INITIAL_ZOOM_LEVEL = 13;

const mapFilter = document.querySelector('.map__filters');
const housingType = mapFilter.querySelector('#housing-type');
const housingPrice = mapFilter.querySelector('#housing-price');
const housingRooms = mapFilter.querySelector('#housing-rooms');
const housingGuests = mapFilter.querySelector('#housing-guests');
const map = L.map('map-canvas');
const markerGroup = L.layerGroup().addTo(map);
const mainMarkerIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});
const mainMarker = L.marker(
  {
    lat: TokyoCoordinates.LAT,
    lng: TokyoCoordinates.LNG,
  },
  {
    draggable: true,
    icon: mainMarkerIcon,
  },
);

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

const onMainMarkerMove = ({lat, lng}) => addCoordinates({lat, lng});

const initializeMap = (offers) => {
  map.setView({
    lat: TokyoCoordinates.LAT,
    lng: TokyoCoordinates.LNG,
  }, INITIAL_ZOOM_LEVEL);
  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);
  addCoordinates(mainMarker.getLatLng());
  mainMarker.addEventListener('moveend', (evt) => onMainMarkerMove(evt.target.getLatLng()));
  mainMarker.addTo(map);
  createMarkers(offers);
};

const resetMap = () => {
  mapFilter.reset();
  mainMarker.setLatLng({
    lat: TokyoCoordinates.LAT,
    lng: TokyoCoordinates.LNG,
  });
  map.setView({
    lat: TokyoCoordinates.LAT,
    lng: TokyoCoordinates.LNG,
  }, INITIAL_ZOOM_LEVEL);
  map.closePopup();
  addCoordinates(mainMarker.getLatLng());
};

const isAnySelected = (selectedValue) => selectedValue === 'any';

const isTypeMatches = (type) => isAnySelected(housingType.value) || type === housingType.value;

const isPriceMatches = (price) => {
  if (!isAnySelected(housingPrice.value)) {
    switch (housingPrice.value) {
      case 'low':
        return price < 10000;
      case 'middle':
        return (price >= 10000) && (price < 50000);
      case 'high':
        return price >= 50000;
    }
  }
  return true;
};

const isRoomsNumberMatches = (rooms) => isAnySelected(housingRooms.value) || rooms === housingRooms.value;

const isGuestsNumberMatches = (guests) => isAnySelected(housingGuests.value) || guests === housingGuests.value;

const isFeaturesListMatches = (features) => {
  if (features) {
    const checkedMapFeatures = mapFilter.querySelectorAll('.map__checkbox:checked');
    const checkedFeaturesValues = [];
    checkedMapFeatures.forEach((checkedFeature) => checkedFeaturesValues.push(checkedFeature.value));
    return checkedFeaturesValues.every((checkedValue) => features.includes(checkedValue));
  }
  return false;
};

const filterAdverts = ({offer: {type, price, rooms, guests, features}}) =>
  isTypeMatches(type) && isPriceMatches(price) && isRoomsNumberMatches(rooms) && isGuestsNumberMatches(guests) && isFeaturesListMatches(features);

const updateMapMarkers = (adverts) => {
  markerGroup.clearLayers();
  createMarkers(adverts);
};

const checkMapFilter = (onMapFilterChange) => {
  mapFilter.addEventListener('change', onMapFilterChange);
};

export {map, initializeMap, setFilterEnabled, resetMap, checkMapFilter, updateMapMarkers, filterAdverts};
