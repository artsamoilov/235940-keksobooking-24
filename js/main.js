import {HOUSING_QUANTITY, createHousing} from './utils/data.js';

const housingOffers = Array.from({length: HOUSING_QUANTITY}, createHousing);

// чтобы линтер не ругался на неиспользуемую переменную
housingOffers.sort();
