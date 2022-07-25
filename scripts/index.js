// Выбор popup элементвов по модификаторам
const popupEditProfile = document.querySelector(".popup_edit_profile");
const popupEditCard = document.querySelector(".popup_edit_card");
const popupViewImage = document.querySelector(".popup_view_image");

// Выбор кнопок редактирования, добавления и закрытия
const profileEditBotton = document.querySelector(".profile__edit-button"); //кнопка открытия профиля
const profileAddCardButton = document.querySelector(".profile__add-card-button"); // кнопка добавления карточки
const popupCloseBotton = document.querySelectorAll(".popup__close"); // кнопки закрытия

// Выбор форм
const formTypeEdit = document.querySelector(".popup-form_type_edit"); // форма редактирования профиля
const formTypeAdd = document.querySelector(".popup-form_type_add"); // форма добавления карточки

// Элементы из форм
const nameInput = document.querySelector(".popup-form__input_text_name"); // поле имя в форме редактирования
const jobInput = document.querySelector(".popup-form__input_text_job"); // поле описание в форме редактирования
const placeInput = document.querySelector(".popup-form__input_text_name-place"); // поле название места в форме добавления
const linkInput = document.querySelector(".popup-form__input_text_place-link"); // поле ссылка в форме добавления

// Выберите элементы, куда должны быть вставлены значения полей
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");

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
]; // массив для рендера по умолчанию


// Функции открытия и закрытия popup

// функция открытия popup
function openPopup (popup) {
  popup.classList.add("popup_is-opened");
}

//функция закрытия popup
function closePopup (popup) {
  popup.classList.remove("popup_is-opened");
}

// событие по кнопке редактирование профиля
profileEditBotton.addEventListener("click" , function () {
  openPopup(popupEditProfile);
  addProfileValue();
});

// событие по кнопке добавления карточки
profileAddCardButton.addEventListener("click", function () {
  openPopup(popupEditCard);
});

// Функция перебора кнопок и нахождения popup для закрытия
popupCloseBotton.forEach((button) => {
  const currntPopup = button.closest(".popup");
  button.addEventListener("click", () => {
    closePopup(currntPopup);
  });
});


//функция добавления значений из профиля
function addProfileValue() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
}


// функция добавления данных в профиль
function formAddProfile (evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  closePopup(popupEditProfile);
}
formTypeEdit.addEventListener('submit', formAddProfile);


function renderCard() {
  initialCards.forEach(function (element) {

    const cardElementConteiner = cardsElementTemplate.cloneNode(true);
    const imageElement = cardElementConteiner.querySelector(".element__image");
    const cardbottonDel = cardElementConteiner.querySelector('.element__trash');

    imageElement.src = element.link;
    imageElement.alt = element.name;
    cardElementConteiner.querySelector(".element__title").textContent = element.name;

    cardbottonDel.addEventListener("click", function () {
      cardElementConteiner.remove();
    });

    elementConteiner.append(cardElementConteiner);
});

}
renderCard();



















