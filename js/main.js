function getFloatFromRange(min, max) {
  return max > min ? Math.random() * (max - min) + min : Math.random() * (min - max) + max;
}

function getIntegerFromRange(min, max) {
  return Math.round(getFloatFromRange(min, max));
}

function getFormattedFloatFromRange(min, max, floatLength) {
  return getFloatFromRange(min, max).toFixed(floatLength);
}

getIntegerFromRange(0, 10);
getFormattedFloatFromRange(1.0, 1.1, 3);
