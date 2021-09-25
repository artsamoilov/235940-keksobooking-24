const getFloatFromRange = (min, max, precision) => {
  const floatNumber = max > min ? Math.random() * (max - min) + min : Math.random() * (min - max) + max;
  return Number(floatNumber.toFixed(precision));
};

const getIntegerFromRange = (min, max) => getFloatFromRange(min, max, 0);

getIntegerFromRange(9, 10);
getFloatFromRange(1.0, 1.1, 3);
