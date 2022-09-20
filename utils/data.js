// массив для рендера по умолчанию
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

// Выбор всех форм полей ввода и элементов для ошибок
const objectFromValidation = {
  formSelector: '.popup-form',
  inputSelector: '.popup-form__input',
  submitButtonSelector: '.popup-form__button',
  inactiveButtonClass: 'popup-form__button_disabled',
  inputErrorClass: 'popup-form__input_type_error',
  errorClass: 'popup-form__error_active'
};

const popupEditProfile = ".popup_edit_profile";
const popupEditCard = ".popup_edit_card";
const popupViewImage = ".popup_view_image";

// Выбор контейнера под шаблон и сам шаблон
const elementContainer = ".elements-content";

const profileTitle = ".profile__title";
const profileSubtitle = ".profile__subtitle";

// Выбор кнопок редактирования, добавления и закрытия
const profileEditButton = document.querySelector(".profile__edit-button"); //кнопка открытия профиля
const profileAddCardButton = document.querySelector(".profile__add-card-button"); // кнопка добавления карточки

// Выбор форм
const formTypeEdit = document.querySelector(".popup-form_type_edit"); // форма редактирования профиля
const formTypeAdd = document.querySelector(".popup-form_type_add"); // форма добавления карточки

export {initialCards, objectFromValidation,
   popupEditProfile, popupEditCard, popupViewImage,
    elementContainer, profileTitle, profileSubtitle,
    profileEditButton, profileAddCardButton, formTypeEdit, formTypeAdd};
