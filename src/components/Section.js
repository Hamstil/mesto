export class Section {
  constructor({ renderer }, selectorContainer) {
    this.renderer = renderer;
    this._container = document.querySelector(selectorContainer);
  }

  renderItems(cardsArray) {
    cardsArray.forEach((item) => {
      this.renderer(item);
    });
    }

  addItem(element) {
    this._container.prepend(element);
  }
}


