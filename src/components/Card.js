export class Card {
  constructor({data, cardTemlateSelector, viewImageCard, handleDeleteCard, profileId}){
    this._data = data;
    this._name = data.name;
    this._link = data.link;
    this._ownerCardId = data.owner._id;
    this._profileId = profileId;
    this._cardTemlateSelector = cardTemlateSelector;
    this._viewImageCard = viewImageCard;
    this._handleDeleteCard = handleDeleteCard;
    this._element = this._getTemplate();
    this._image = this._element.querySelector('.element__image');
    this._deleteButton = this._element.querySelector('.element__trash');
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
    this.deleteDeleteButton();
    return this._element;
  }

  // функция удаления
  deleteCard = () => {
    this._element.remove();
    this._element = null;
  }

  // удаление кнопки удаления карты
  deleteDeleteButton() {
    if (this._ownerCardId !== this._profileId) {
      this._deleteButton.remove();
    }
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
    this._element.querySelector('.element__trash').addEventListener('click', () => {
      this._handleDeleteCard(this.getId());
    });

    // слушатель для открытия popup image
    this._image.addEventListener('click', () => {
      this._viewImageCard(this._name, this._link);
    });
  }

  // получение id карточки
  getId() {
    return this._data._id;
  }

}


