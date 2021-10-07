import {getFloatFromRange, getIntegerFromRange} from './utils.js';

const HOUSING_TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];

const CHECK_VARIANTS = [
  '12:00',
  '13:00',
  '14:00',
];

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

const TITLES = [
  'Уютное гнёздышко в центре Токио',
  'Идеальный вариант для туристов',
  'Сдам в аренду. Срочно!',
  'Жильё в традиционном японском стиле',
  'Современные жилые помещения от собственника',
];

const DESCRIPTIONS = [
  'Небольшое уютное жильё с панорамными окнами и видом на парк.',
  'Самое сердце Токио. Можно с животными. Без залога.',
  'Отличное расположение, развитая инфраструктура, рядом два японских сада и пруд с карпами.',
  'Шикарный вариант! 9/10 арендаторов возвращаются, чтобы ещё немного пожить в этом райском местечке.',
  'Тишина кругом.\nПроникают в сердце скал\nГолоса цикад.',
];

const createHousingOffers = (quantity) => {
  const indexes = Array.from({length: quantity}, (empty, value) => ++value).sort(() => 0.5 - Math.random());

  const createHousing = () => {
    const housingLocation = [getFloatFromRange(35.65, 35.7, 5), getFloatFromRange(139.7, 139.8, 5)];
    const generateIndex = () => {
      const index = indexes.splice(getIntegerFromRange(0, indexes.length - 1), 1);
      return (index < 10) ? `0${index}` : index;
    };

    return {
      author: {
        avatar: `img/avatars/user${generateIndex()}.png`,
      },
      offer: {
        title: TITLES[getIntegerFromRange(0, TITLES.length - 1)],
        address: housingLocation.join(', '),
        price: getIntegerFromRange(1000, 100000),
        type: HOUSING_TYPES[getIntegerFromRange(0, HOUSING_TYPES.length - 1)],
        rooms: getIntegerFromRange(1, 10),
        guests: getIntegerFromRange(1, 10),
        checkin: CHECK_VARIANTS[getIntegerFromRange(0, CHECK_VARIANTS.length - 1)],
        checkout: CHECK_VARIANTS[getIntegerFromRange(0, CHECK_VARIANTS.length - 1)],
        features: FEATURES.slice().sort(() => 0.5 - Math.random()).slice(0, getIntegerFromRange(1, FEATURES.length - 1)),
        description: DESCRIPTIONS[getIntegerFromRange(0, DESCRIPTIONS.length - 1)],
        photos: PHOTOS.slice().sort(() => 0.5 - Math.random()).slice(0, getIntegerFromRange(1, PHOTOS.length - 1)),
      },
      location: {
        lat: housingLocation[0],
        lng: housingLocation[1],
      },
    };
  };

  return Array.from({length: quantity}, createHousing);
};

export {createHousingOffers};
