export class Card {
  constructor(name, link, cardTemlateSelector, viewImageCard){
    this._name = name;
    this._link = link;
    this._cardTemlateSelector = cardTemlateSelector;
    this._viewImageCard = viewImageCard;
    this._element = this._getTemplate();
    this._image = this._element.querySelector('.element__image');
  }

  // шаблон карточки
  _getTemplate () {
    const cardTemplate = document.querySelector(this._cardTemlateSelector).content.querySelector(".element").cloneNode(true);

    return cardTemplate;
  }

  // саздание карточки и заполнение
  generateCard () {
    this._setEventListener();
    this._image.src = this._link;
    this._image.alt = this._name;
    this._element.querySelector('.element__title').textContent = this._name;
    return this._element;
  }

  // функция удаления
  _handleDel = () => {
    this._element.remove();
    this._element = null;
  }

  // функция лайка
  _handleLike = (evt) => {
    evt.target.classList.toggle("element__like_enable");
  }

  // слушатели событий
  _setEventListener () {

    // слушатель лайка
    this._element.querySelector('.element__like').addEventListener('click', this._handleLike);

    // слушатель удаления
    this._element.querySelector('.element__trash').addEventListener('click', this._handleDel);

    // слушатель для открытия popup image
    this._image.addEventListener('click', () => {
      this._viewImageCard(this._name, this._link);
    });
  }

}


