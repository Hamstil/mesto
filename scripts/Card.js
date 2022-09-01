export class Card {
  constructor(name, link, cardTemlateSelector){
    this._name = name;
    this._link = link;
    this._cardTemlateSelector = cardTemlateSelector;
    this._element = this._getTemplate();
    this._image = this._element.querySelector('.element__image');
  }

  // шаблон карточки
  _getTemplate() {
    const cardTemplate = document.querySelector(this._cardTemlateSelector).content.querySelector(".element").cloneNode(true);

    // this._image = cardTemplate.querySelector(".element__image");
    // this._title = cardTemplate.querySelector(".element__title");

    // const buttonDel = cardTemplate.querySelector(".element__trash");
    // const buttonLike = cardTemplate.querySelector(".element__like");

    // cardImage.src = itemCard.link;
    // cardImage.alt = itemCard.name;
    // cardTitle.textContent = itemCard.name;

    // buttonDel.addEventListener("click", handleDelCard);
    // buttonLike.addEventListener("click", handleLikeCard);
    // cardImage.addEventListener("click", (data) => viewImageCard(data));

    return cardTemplate;
  }

  generateCard () {
    this._image.src = this._link;
    this._image.alt = this._name;
    this._element.querySelector('.element__title').textContent = this._name;
    return this._element;
  }



}


