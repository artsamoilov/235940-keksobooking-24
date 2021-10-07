import {createHousingOffers} from './utils/data.js';

const HOUSING_QUANTITY = 10;
const housingOffers = createHousingOffers(HOUSING_QUANTITY);

// чтобы линтер не ругался на неиспользуемую переменную
housingOffers.sort();
