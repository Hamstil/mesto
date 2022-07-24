const elementConteiner = document.querySelector(".elements-content");
const cardsElementTemplate = document.querySelector(".cards-element").content.children[0];

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

function renderCard() {
    initialCards.forEach(function (element) {
      const cardElementConteiner = cardsElementTemplate.cloneNode(true);

      cardElementConteiner.querySelector(".element__image").src = element.link;
      cardElementConteiner.querySelector(".element__title").textContent = element.name;

      const cardbottonDel = cardElementConteiner.querySelector('.element__trash');
      cardbottonDel.addEventListener("click", function () {
        cardElementConteiner.remove();
      });


      elementConteiner.append(cardElementConteiner);
  });

}
renderCard();



//Отбор элементов редактировани, добавления и изображения
const profileEditBotton = document.querySelector(".profile__edit-button");
const profileAddCardButton = document.querySelector(".profile__add-card-button");
const elementImage = document.querySelector(".element__image");


const popupElement = document.querySelector(".popup");
const popupCloseBotton = document.querySelector(".popup__close");

// Выберите элементы, куда должны быть вставлены значения полей
let profileTitle = document.querySelector(".profile__title");
let profileSubtitle = document.querySelector(".profile__subtitle");

// Находим форму в DOM
let formElement = document.querySelector(".popup-form");
// Находим поля формы в DOM
let nameInput = document.querySelector(".popup-form__input_text_name");
let jobInput = document.querySelector(".popup-form__input_text_job");

function openPopup () {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
  popupElement.classList.add("popup_is-opened");
}

function closePopup () {
  popupElement.classList.remove("popup_is-opened");
}

profileEditBotton.addEventListener("click" , openPopup);
popupCloseBotton.addEventListener("click", closePopup);

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                           // Так мы можем определить свою логику отправки.
                           // О том, как это делать, расскажем позже.

    // Вставьте новые значения с помощью textContent
    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = jobInput.value;
    closePopup();
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);
