import { initialCards, objectFromValidation } from '../utils/data.js';
import { Card } from '../components/Card.js';
import { Section } from '../components/Section.js';
import { PopupWithForm }  from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { UserInfo } from '../components/UserInfo.js';
import { FromValidator } from '../components/FormValidator.js';

// Выбор popup элементвов по модификаторам
const popupEditProfile = ".popup_edit_profile";
const popupEditCard = ".popup_edit_card";
const popupViewImage = ".popup_view_image";

// элементы popup_view_image
// const imgPopup = popupViewImage.querySelector(".popup__image");
// const titlePopup = popupViewImage.querySelector(".popup__text");

// Выбор кнопок редактирования, добавления и закрытия
const profileEditButton = document.querySelector(".profile__edit-button"); //кнопка открытия профиля
const profileAddCardButton = document.querySelector(".profile__add-card-button"); // кнопка добавления карточки
const popupCloseButtons = document.querySelectorAll(".popup__close"); // кнопки закрытия

// Выбор форм
const formTypeEdit = document.querySelector(".popup-form_type_edit"); // форма редактирования профиля
const formTypeAdd = document.querySelector(".popup-form_type_add"); // форма добавления карточки

// Элементы из форм
const nameInput = ".popup-form__input_text_name"; // поле имя в форме редактирования
const jobInput = ".popup-form__input_text_job"; // поле описание в форме редактирования
const placeInput = document.querySelector(".popup-form__input_text_name-place"); // поле название места в форме добавления
const linkInput = document.querySelector(".popup-form__input_text_place-link"); // поле ссылка в форме добавления

// Выбор элементов, куда должны быть вставлены значения полей
const profileTitle = ".profile__title";
const profileSubtitle = ".profile__subtitle";

// Выбор контейнера под шаблон и сам шаблон
const elementContainer = ".elements-content";


// функция создания карточки
function creatCard (item) {
  const newCard = new Card(item, ".cards-element", viewImageCard);
  creatDefaultCards.setItem(newCard.generateCard());
}

// функция рендера картинок по умолчанию
const creatDefaultCards = new Section({data: initialCards, renderer: creatCard}, elementContainer);
creatDefaultCards.renderItems();


const user = new UserInfo({nameInput: profileTitle, jobInput: profileSubtitle});
const modalPopupProfile = new PopupWithForm(popupEditProfile, (dataInputs) => {
  user.setUserInfo(dataInputs);
});
modalPopupProfile.setEventListeners();


// событие по кнопке редактирование профиля
profileEditButton.addEventListener("click" , function () {
  formTypeEdit.reset();
  enableValidatorTypeEdit.clearError();
  modalPopupProfile.open();
});


const modalPopupAdd = new PopupWithForm(popupEditCard);
modalPopupAdd.setEventListeners();

// событие по кнопке добавления карточки
profileAddCardButton.addEventListener("click", function () {
  formTypeAdd.reset();
  enableValidatorTypeAdd.clearError();
  modalPopupAdd.open();
});

const popupWithImage = new PopupWithImage(popupViewImage);

// функция отображения картинки на весь экран
function viewImageCard (name, link) {
  popupWithImage.open(name, link);
}


// валидация формы редактирования профиля
const enableValidatorTypeEdit = new FromValidator(objectFromValidation, formTypeEdit);
enableValidatorTypeEdit.enableValidation();
// валидация формы добавления карточки
const enableValidatorTypeAdd = new FromValidator(objectFromValidation, formTypeAdd);
enableValidatorTypeAdd.enableValidation();


// // Функция перебора кнопок и нахождения popup для закрытия
// popupCloseButtons.forEach((button) => {
//   const currntPopup = button.closest(".popup");
//   button.addEventListener("click", () => {
//     closePopup(currntPopup);
//   });
// });

// // функция добавления данных в профиль
// function addFormToProfile (evt) {
//   evt.preventDefault();
//   profileTitle.textContent = nameInput.value;
//   profileSubtitle.textContent = jobInput.value;
//   modalPopup.closePopup();
// }

// formTypeEdit.addEventListener("submit", addFormToProfile);

// // функция добавления данных в карточку
// function addFormToCard (evt) {
//   evt.preventDefault();
//   const addCardsInput = {
//     name: placeInput.value,
//     link: linkInput.value,
//   }
//   creatCard(addCardsInput);
//   closePopup(popupEditCard);
//   enableValidatorTypeAdd.disabledButton();
// };

// formTypeAdd.addEventListener("submit", addFormToCard);

// // функция значений из профиля по умолчанию и проверка значений
// function getProfileValue() {
//   nameInput.value = profileTitle.textContent;
//   jobInput.value = profileSubtitle.textContent;
// }
