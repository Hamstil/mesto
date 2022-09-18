export class Section {
  constructor({data, renderer}, containerSelector){
    this._ititialArray = data;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems() {
    this._ititialArray.forEach(item => {
      this._renderer(item);
    });
  }

  // функция добавления элемента в контейнер
  setItem(element) {
    this._container.prepend(element);
  }
}
