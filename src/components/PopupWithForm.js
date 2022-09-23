import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(selectorPopup, callbackSubmitForm) {
    super(selectorPopup);
    this._callbackSubmitForm = callbackSubmitForm;
    this._popup = document.querySelector(selectorPopup);
    this._form = this._popup.querySelector('.popup-form');
    this._formButton = this._popup.querySelector('.popup-form__button');
    this._formInputs = this._form.querySelectorAll('.popup-form__input');
  }

  _getInputValues () {
    const formValues = {};
    this._formInputs.forEach(input => {
          formValues[input.name] = input.value;
        });
        return formValues;
  }

  _disabledFormButton() {
    this._formButton.setAttribute("disabled", "disabled");
    this._formButton.classList.add('popup-form__button_disabled');
  }

  setEventListenersForm () {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._callbackSubmitForm(this._getInputValues());
      this.close();
      this._disabledFormButton();
    });
  }

}