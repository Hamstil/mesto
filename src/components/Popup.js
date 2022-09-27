export class Popup {
  constructor(selectorPopup) {
    this._popup = document.querySelector(selectorPopup);
    this._closePopupByEsc = this._closePopupByEsc.bind(this);
  }

  // функция открытия popup
open () {
  this._popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", this._closePopupByEsc);
}

// функция закрытия popup
close () {
  this._popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", this._closePopupByEsc);
}

// слшатель закрытия по клику на крестик и оверлей
setEventListeners () {
  this._popup.addEventListener('click', (evt) => {
    if (evt.target === evt.currentTarget || evt.target.classList.contains('popup__close')) {
      this.close();
    }
  });
}

// функция закрытия popup по esc
_closePopupByEsc (evt) {
  if (evt.key === 'Escape'){
    this.close();
  }
}
}
