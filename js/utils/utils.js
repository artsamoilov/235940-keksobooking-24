const getFloatFromRange = (min, max, precision) => {
  const floatNumber = max > min ? Math.random() * (max - min) + min : Math.random() * (min - max) + max;
  return Number(floatNumber.toFixed(precision));
};

const getIntegerFromRange = (min, max) => getFloatFromRange(min, max, 0);

const setEnabled = (element, enabled, cssClass) => {
  enabled ? element.classList.add(cssClass) : element.classList.remove(cssClass);
  element.childNodes.forEach((child) => child.disabled = enabled);
};

export {getFloatFromRange, getIntegerFromRange, setEnabled};
