const TokyoCoordinates = {
  LAT: 35.68216,
  LNG: 139.74975,
};

const toggleNodeState = (node, isEnabled, cssDisabilityClass) => {
  isEnabled ? node.classList.remove(cssDisabilityClass) : node.classList.add(cssDisabilityClass);
  node.childNodes.forEach((childNode) => childNode.disabled = !isEnabled);
};

const isEscKey = (evt) => evt.key === 'Escape';

// Функция взята из интернета и доработана
// Источник - https://www.freecodecamp.org/news/javascript-debounce-example
const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {TokyoCoordinates, isEscKey, toggleNodeState, debounce};
