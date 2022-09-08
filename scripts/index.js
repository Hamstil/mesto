import { initialCards, objectFromValidation } from './data.js';
import { Card } from './Card.js';
import { FromValidator } from './FormValidator.js';

// Выбор popup элементвов по модификаторам
const popupEditProfile = document.querySelector(".popup_edit_profile");
const popupEditCard = document.querySelector(".popup_edit_card");
const popupViewImage = document.querySelector(".popup_view_image");

// элементы popup_view_image
const imgPopup = popupViewImage.querySelector(".popup__image");
const titlePopup = popupViewImage.querySelector(".popup__text");

// Выбор кнопок редактирования, добавления и закрытия
const profileEditButton = document.querySelector(".profile__edit-button"); //кнопка открытия профиля
const profileAddCardButton = document.querySelector(".profile__add-card-button"); // кнопка добавления карточки
const popupCloseButtons = document.querySelectorAll(".popup__close"); // кнопки закрытия

// Выбор форм
const formTypeEdit = document.querySelector(".popup-form_type_edit"); // форма редактирования профиля
const formTypeAdd = document.querySelector(".popup-form_type_add"); // форма добавления карточки

// Элементы из форм
const nameInput = document.querySelector(".popup-form__input_text_name"); // поле имя в форме редактирования
const jobInput = document.querySelector(".popup-form__input_text_job"); // поле описание в форме редактирования
const placeInput = document.querySelector(".popup-form__input_text_name-place"); // поле название места в форме добавления
const linkInput = document.querySelector(".popup-form__input_text_place-link"); // поле ссылка в форме добавления

// Выбор элементов, куда должны быть вставлены значения полей
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");

// Выбор контейнера под шаблон и сам шаблон
const elementContainer = document.querySelector(".elements-content");



// Функции открытия и закрытия popup

// функция открытия popup
function openPopup (popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", closePopupByEsc);
  popup.addEventListener("mousedown", closePopupOverlay);
}

// функция закрытия popup
function closePopup (popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closePopupByEsc);
  popup.removeEventListener("mousedown", closePopupOverlay);
}

// функция закрытия popup по overlay
function closePopupOverlay (evt) {
    if (evt.target === evt.currentTarget){
      closePopup(evt.currentTarget);
    }
}

// функция закрытия popup по esc
function closePopupByEsc (evt) {
  if (evt.key === 'Escape'){
    const currentPopup = document.querySelector('.popup_is-opened');
    closePopup(currentPopup);
  }
}

// событие по кнопке редактирование профиля
profileEditButton.addEventListener("click" , function () {
  getProfileValue();
  enableValidatorTypeEdit.clearError();
  enableValidatorTypeEdit.activateButton();
  openPopup(popupEditProfile);
});

// функция значений из профиля по умолчанию и проверка значений
function getProfileValue() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
}

// событие по кнопке добавления карточки
profileAddCardButton.addEventListener("click", function () {
  formTypeAdd.reset();
  enableValidatorTypeAdd.clearError();
  enableValidatorTypeAdd.disabledButton();
  openPopup(popupEditCard);
});

// Функция перебора кнопок и нахождения popup для закрытия
popupCloseButtons.forEach((button) => {
  const currntPopup = button.closest(".popup");
  button.addEventListener("click", () => {
    closePopup(currntPopup);
  });
});

// функция добавления данных в профиль
function addFormToProfile (evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  closePopup(popupEditProfile);
}

formTypeEdit.addEventListener("submit", addFormToProfile);

// функция создания карточки
function creatCard (itemCard) {

  const newCard = new Card(itemCard.name, itemCard.link, ".cards-element", viewImageCard).generateCard();
  return newCard;

}

// функция добавления данных в карточку
function addFormToCard (evt) {
  evt.preventDefault();
  const addCardsInput = {
    name: placeInput.value,
    link: linkInput.value,
  }
  elementContainer.prepend(creatCard(addCardsInput));
  document.addEventListener("keydown", preventDefaultEnter); // нужно для того что бы при нажатии на Enter несколько раз карточка не дублировалась
  closePopup(popupEditCard);
};

formTypeAdd.addEventListener("submit", addFormToCard);


// функция предотвратить ввод Enter по умолчанию
function preventDefaultEnter (evt) {
    if (evt.key === "Enter"){
      evt.preventDefault();
    }
}

// Функция отображения карточек по уполчанию
function creatDefaultCards () {

  initialCards.forEach((card) => {
    elementContainer.append(creatCard(card));
  });
}
creatDefaultCards();

// функция отображения картинки на весь экран
function viewImageCard (name, link) {
  imgPopup.src = link;
  imgPopup.alt = name;
  titlePopup.textContent = name;
  openPopup(popupViewImage);
}


// валидация формы редактирования профиля
const enableValidatorTypeEdit = new FromValidator(objectFromValidation, formTypeEdit);
enableValidatorTypeEdit.enableValidation();
// валидация формы добавления карточки
const enableValidatorTypeAdd = new FromValidator(objectFromValidation, formTypeAdd);
enableValidatorTypeAdd.enableValidation();
