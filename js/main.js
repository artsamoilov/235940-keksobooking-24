const getFloatFromRange = (min, max) => max > min ? Math.random() * (max - min) + min : Math.random() * (min - max) + max;

const getIntegerFromRange = (min, max) => Math.round(getFloatFromRange(min, max));

const getFormattedFloatFromRange = (min, max, floatLength) => Number(getFloatFromRange(min, max).toFixed(floatLength));

console.log(getIntegerFromRange(0, 10));
console.log(typeof getIntegerFromRange(0, 10));
console.log(getFormattedFloatFromRange(0.1, 1.1, 3));
console.log(typeof getFormattedFloatFromRange(1.0, 1.1, 3));
