const adForm = document.querySelector('.ad-form');

const changeFormDisability = (form, disable, formDisabilityClass) => {
  disable ? form.classList.add(formDisabilityClass) : form.classList.remove(formDisabilityClass);
  form.childNodes.forEach((element) => element.disabled = disable);
};

export {adForm, changeFormDisability};
