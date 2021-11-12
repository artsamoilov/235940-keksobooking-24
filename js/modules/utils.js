const TokyoCoordinates = {
  LAT: 35.68216,
  LNG: 139.74975,
};

const setEnabled = (node, isEnabled, cssDisabilityClass) => {
  isEnabled ? node.classList.remove(cssDisabilityClass) : node.classList.add(cssDisabilityClass);
  node.childNodes.forEach((childNode) => childNode.disabled = !isEnabled);
};

const isEscKey = (evt) => evt.key === 'Escape';

export {TokyoCoordinates, isEscKey, setEnabled};
