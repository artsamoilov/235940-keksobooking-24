function getFloatFromRange(min, max) {
  return max > min ? Math.random() * (max - min) + min : Math.random() * (min - max) + max;
}

function getIntegerFromRange(min, max) {
  return Math.round(getFloatFromRange(min, max));
}

function getFormattedFloatFromRange(min, max, floatLength) {
  return Number(getFloatFromRange(min, max).toFixed(floatLength));
}

console.log(getIntegerFromRange(0, 10));
console.log(typeof getIntegerFromRange(0, 10));
console.log(getFormattedFloatFromRange(1.0, 1.1, 3));
console.log(typeof getFormattedFloatFromRange(1.0, 1.1, 3));
