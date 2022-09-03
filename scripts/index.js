import {initialCards, objectFromValidation} from './data.js';
import {Card} from './Card.js';





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
const buttonFormTypeAdd = formTypeAdd.querySelector(".popup-form__button"); // кнопка в форме добавления карточки
const buttonFormTypeEdit = formTypeEdit.querySelector(".popup-form__button"); // кнопка в форме профиля

// Выбор элементов, куда должны быть вставлены значения полей
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");

// Выбор контейнера под шаблон и сам шаблон
const elementContainer = document.querySelector(".elements-content");
const cardsElementTemplate = document.querySelector(".cards-element").content.querySelector(".element");

// Функции открытия и закрытия popup

// функция открытия popup
function openPopup (popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", closePopupByEsc);
  closePopupOverlay(popup);
  document.removeEventListener("keydown", preventDefaultEnter);
}

//функция закрытия popup
function closePopup (popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closePopupByEsc);
}

//функция закрытия popup по overlay
function closePopupOverlay (popupOpen) {
  popupOpen.addEventListener("mousedown", function(evt){
    if (evt.target === evt.currentTarget){
      closePopup(evt.currentTarget);
    }
  });
}

//функция закрытия popup по esc
function closePopupByEsc (evt) {
  if (evt.key === 'Escape'){
    const currentPopup = document.querySelector('.popup_is-opened');
    closePopup(currentPopup);
  }
}

// событие по кнопке редактирование профиля
profileEditButton.addEventListener("click" , function () {
  getProfileValue();
  clearError(objectFromValidation);
  activateButton(buttonFormTypeEdit, objectFromValidation);
  openPopup(popupEditProfile);
});

//функция значений из профиля по умолчанию и проверка значений
function getProfileValue() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
}

// событие по кнопке добавления карточки
profileAddCardButton.addEventListener("click", function () {
  formTypeAdd.reset();
  clearError(objectFromValidation);
  disabledButton(buttonFormTypeAdd, objectFromValidation);
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
  document.addEventListener("keydown", preventDefaultEnter);
  disabledButton(buttonFormTypeAdd, objectFromValidation);
  closePopup(popupEditCard);
};

formTypeAdd.addEventListener("submit", addFormToCard);


// функция предотвратить ввод Enter по умолчанию
function preventDefaultEnter (evt) {
    if (evt.key === "Enter"){
      evt.preventDefault();
    }
}

//Функция отображения карточек по уполчанию
function creatDefaultCards () {

  initialCards.forEach((card) => {
    elementContainer.append(creatCard(card));
  });
}
creatDefaultCards();

// функция отображения картинки на весь экран
function viewImageCard (data) {
  imgPopup.src = data.target.src;
  imgPopup.alt = data.target.alt;
  titlePopup.textContent = data.target.alt;
  openPopup(popupViewImage);
}





// ВАЛИДАЦИЯ ФОРМЫ
enableFormValidation(objectFromValidation);

// функция включения валидации
function enableFormValidation (objectFromValidation) {
  const formList = Array.from(document.querySelectorAll(objectFromValidation.formSelector));
  formList.forEach((formElement) => {
    setEventListenters(formElement, objectFromValidation);
  });

};

// функция слушатель событий ввода

function setEventListenters (formElement, objectFromValidation) {
  // находим все поля форм
  const inputList = Array.from(formElement.querySelectorAll(objectFromValidation.inputSelector));
  const buttonElement = formElement.querySelector(objectFromValidation.submitButtonSelector);

  toggleButtonState(inputList, buttonElement, objectFromValidation);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      isValid(formElement, inputElement, objectFromValidation);
      toggleButtonState(inputList, buttonElement, objectFromValidation);
    });
  });
};

// функция валидации
function isValid (formElement, inputElement, objectFromValidation) {
  if (!inputElement.validity.valid){
    showInputError(formElement, inputElement, inputElement.validationMessage, objectFromValidation);
  }
  else {
    hideInputError(formElement, inputElement, objectFromValidation);
  }
};

// функция показа ошибки
function showInputError (formElement, inputElement, errorMessage, objectFromValidation) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(objectFromValidation.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(objectFromValidation.errorClass);
};

// функция скрытия ошибки
function hideInputError (formElement, inputElement, objectFromValidation) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(objectFromValidation.inputErrorClass);
  errorElement.classList.remove(objectFromValidation.errorClass);
  errorElement.textContent = '';
};

// функция проверки формы на валидность
function hasInvalidInput (inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

// функция отключения кнопки
function disabledButton (buttonElement, objectFromValidation) {
  buttonElement.setAttribute("disabled", "disabled");
  buttonElement.classList.add(objectFromValidation.inactiveButtonClass);
}
 // функция включения кнопки
 function activateButton (buttonElement, objectFromValidation) {
    buttonElement.removeAttribute("disabled");
    buttonElement.classList.remove(objectFromValidation.inactiveButtonClass);
 }

// функция включения кнопки в зависимости валидности формы
function toggleButtonState (inputList, buttonElement, objectFromValidation) {
  if (hasInvalidInput(inputList)) {
    disabledButton(buttonElement, objectFromValidation);
  }
  else {
    activateButton(buttonElement, objectFromValidation);
  }
};


// функция отчистки ошибок формы
function clearError (objectFromValidation) {
  const errors = document.querySelectorAll(`.${objectFromValidation.errorClass}`);
  errors.forEach((error) => {
    error.classList.remove(objectFromValidation.errorClass);
    error.textContent ='';
  });
  const inputErrors = document.querySelectorAll(`.${objectFromValidation.inputErrorClass}`);
  inputErrors.forEach((inputError) => {
    inputError.classList.remove(objectFromValidation.inputErrorClass);
  });
};
