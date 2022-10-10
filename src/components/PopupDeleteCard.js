import { Popup } from "./Popup.js";

export class PopupDeleteCard extends Popup {
  constructor(selectorPopup){
    super(selectorPopup);
    this._form = this._popup.querySelector('.popup-form');
  }

  setSubmitDelete(remove) {
    this._handleSubmit = remove;
  }

  setEventListenersFromDelete() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmit();
    })
  }
}
