import {createPopup} from './popup.js';
import {setEnabled} from './utils.js';
import {addCoordinates} from './form.js';
import {TokyoCoordinates} from './data.js';

const MAP_FILTER_DISABILITY_CLASS = 'map__filters--disabled';
const INITIAL_ZOOM_LEVEL = 13;
const mapFilter = document.querySelector('.map__filters');
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
  mainMarker.on('moveend', (evt) => {
    addCoordinates(evt.target.getLatLng());
  });
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

const getAdvertRank = ({offer: {features}}) => {
  const checkedMapFeatures = mapFilter.querySelectorAll('.map__checkbox:checked');
  let rank = 0;
  if (features) {
    checkedMapFeatures.forEach((checkedFeature) => {
      if (features.some((feature) => feature === checkedFeature.value)) {
        rank++;
      }
    });
  }
  return rank;
};

const filterAdverts = ({offer: {type, price, rooms, guests}}) => {
  const housingType = mapFilter.querySelector('#housing-type').value;
  const housingPrice = mapFilter.querySelector('#housing-price').value;
  const housingRooms = mapFilter.querySelector('#housing-rooms').value;
  const housingGuests = mapFilter.querySelector('#housing-guests').value;
  let isTypeMatches = true;
  let isPriceMatches = true;
  let isRoomsMatches = true;
  let isGuestsMatches = true;

  if (housingType !== 'any') {
    isTypeMatches = (type === housingType);
  }
  if (housingPrice !== 'any') {
    switch (housingPrice) {
      case 'low':
        isPriceMatches = (price < 10000);
        break;
      case 'middle':
        isPriceMatches = ((price >= 10000) && (price < 50000));
        break;
      case 'high':
        isPriceMatches = (price >= 50000);
        break;
    }
  }
  if (housingRooms !== 'any') {
    isRoomsMatches = (rooms === housingRooms);
  }
  if (housingGuests !== 'any') {
    isGuestsMatches = (guests === housingGuests);
  }
  return (isTypeMatches && isPriceMatches && isRoomsMatches && isGuestsMatches);
};

const updateMapMarkers = (adverts) => {
  markerGroup.clearLayers();
  createMarkers(adverts);
};

const checkMapFilter = (cb) => {
  mapFilter.addEventListener('change', cb);
};

const compareAdverts = (advert1, advert2) => {
  const rank1 = getAdvertRank(advert1);
  const rank2 = getAdvertRank(advert2);
  return rank2 - rank1;
};

export {map, initializeMap, setFilterEnabled, resetMap, compareAdverts, checkMapFilter, updateMapMarkers, filterAdverts};
