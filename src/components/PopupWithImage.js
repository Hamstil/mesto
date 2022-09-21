import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(selectorPopup) {
      super(selectorPopup);
      this.imagePopup = document.querySelector('.popup__image');
      this.text = document.querySelector('.popup__text');
  }

  open(name, link) {
    this.imagePopup.src = link;
    this.imagePopup.alt = name;
    this.text.textContent = name;
    super.open();
  }
}
