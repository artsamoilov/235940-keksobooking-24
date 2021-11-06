const TokyoCoordinates = {
  LAT: 35.68216,
  LNG: 139.74975,
};

const setEnabled = (element, enabled, cssClass) => {
  enabled ? element.classList.remove(cssClass) : element.classList.add(cssClass);
  element.childNodes.forEach((child) => child.disabled = !enabled);
};

const isEscKey = (evt) => evt.key === 'Escape';

export {TokyoCoordinates, isEscKey, setEnabled};
