import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(selectorPopup, callbackSubmitForm) {
    super(selectorPopup);
    this._popup = document.querySelector(selectorPopup);
    this._callbackSubmitForm = callbackSubmitForm;
    this._form = this._popup.querySelector('.popup-form');
    this._formInputs = this._form.querySelectorAll('.popup-form__input');
  }

  _getInputValues () {
    const formValues = {};
      this._formInputs.forEach(input => {
          formValues[input.getAttribute('name')] = input.value;
        });
        return formValues;
  }

  setEventListeners () {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._callbackSubmitForm(this._getInputValues());
      this.close();
    });
  }



}
