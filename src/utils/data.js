// Выбор всех форм полей ввода и элементов для ошибок
const objectFromValidation = {
  formSelector: '.popup-form',
  inputSelector: '.popup-form__input',
  submitButtonSelector: '.popup-form__button',
  inactiveButtonClass: 'popup-form__button_disabled',
  inputErrorClass: 'popup-form__input_type_error',
  errorClass: 'popup-form__error_active'
};

const configApi = {
  url: 'https://mesto.nomoreparties.co/v1/cohort-51',
  headers: {
    authorization: "1b483a2a-ec99-4b2e-b31a-7f2b36b71675",
    "content-type": "application/json"
  }
}

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

export {objectFromValidation,
   popupEditProfile, popupEditCard, popupViewImage,
    elementContainer, profileTitle, profileSubtitle,
    profileEditButton, profileAddCardButton, formTypeEdit, formTypeAdd, configApi};
