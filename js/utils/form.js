const deactivateForm = (form) => {
  form.classList.add('ad-form--disabled');
  form.childNodes.forEach((element) => element.disabled = true);
};

const activateForm = (form) => {
  form.classList.remove('ad-form--disabled');
  form.childNodes.forEach((element) => element.disabled = false);
};

const mapFilters = document.querySelector('.map__filters');
const adForm = document.querySelector('.ad-form');

const deactivateAll = () => {
  deactivateForm(mapFilters);
  deactivateForm(adForm);
};

const activateAll = () => {
  activateForm(mapFilters);
  activateForm(adForm);
};

export {activateAll, deactivateAll};
