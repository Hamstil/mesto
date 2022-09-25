import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(selectorPopup) {
      super(selectorPopup);
      this.imagePopup = this._popup.querySelector('.popup__image');
      this.text = this._popup.querySelector('.popup__text');
  }

  open(name, link) {
    this.imagePopup.src = link;
    this.imagePopup.alt = name;
    this.text.textContent = name;
    super.open();
  }
}
