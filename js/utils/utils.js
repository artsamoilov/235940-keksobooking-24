const setEnabled = (element, enabled, cssClass) => {
  enabled ? element.classList.remove(cssClass) : element.classList.add(cssClass);
  element.childNodes.forEach((child) => child.disabled = !enabled);
};

const isEscKey = (evt) => evt.key === 'Escape';

export {isEscKey, setEnabled};
