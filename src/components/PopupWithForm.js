import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(selectorPopup, callbackSubmitForm) {
    super(selectorPopup);
    this._callbackSubmitForm = callbackSubmitForm;
    this._popup = document.querySelector(selectorPopup);
    this._form = this._popup.querySelector('.popup-form');
    this._formInputs = this._form.querySelectorAll('.popup-form__input');
    this._buttonSubmit = this._popup.querySelector('.popup-form__button');
    this._buttonSubmitText = this._buttonSubmit.textContent;
  }

  _getInputValues () {
    const formValues = {};
    this._formInputs.forEach(input => {
          formValues[input.name] = input.value;
        });
        return formValues;
  }

  setInputValues(data) {
    this._formInputs.forEach((input) => {
    input.value = data[input.name];
    });
  }

  renderLoading(isLoading, loadingText='Сохранение...') {
    if (isLoading) {
      this._buttonSubmit.textContent = loadingText;
    } else {
      this._buttonSubmit.textContent = this._buttonSubmitText;
    }
  }

  setEventListenersForm () {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._callbackSubmitForm(this._getInputValues());
    });
  }

  close = () => {
    super.close();
    this._form.reset();
  }

}
