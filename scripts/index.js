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
  buttonFormTypeAdd.setAttribute("disabled", "disabled");
  buttonFormTypeAdd.classList.add("popup-form__button_disabled");
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
  openPopup(popupEditProfile);
});

//функция значений из профиля по умолчанию и проверка значений
function getProfileValue() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
  if (nameInput.value && jobInput.value) {
    buttonFormTypeEdit.removeAttribute("disabled");
    buttonFormTypeEdit.classList.remove("popup-form__button_disabled");
  }
}

// событие по кнопке добавления карточки
profileAddCardButton.addEventListener("click", function () {
  formTypeAdd.reset();
  clearError(objectFromValidation);
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
function addFormToProfile () {
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  closePopup(popupEditProfile);
}

formTypeEdit.addEventListener("submit", addFormToProfile);

// функция создания карточки
function creatCard (itemCard) {

  const cardTemplate = cardsElementTemplate.cloneNode(true);

  const cardImage = cardTemplate.querySelector(".element__image");
  const cardTitle = cardTemplate.querySelector(".element__title");
  const buttonDel = cardTemplate.querySelector(".element__trash");
  const buttonLike = cardTemplate.querySelector(".element__like");

  cardImage.src = itemCard.link;
  cardImage.alt = itemCard.name;
  cardTitle.textContent = itemCard.name;

  buttonDel.addEventListener("click", handleDelCard);
  buttonLike.addEventListener("click", handleLikeCard);
  cardImage.addEventListener("click", (data) => viewImageCard(data));

  return cardTemplate;
}

// функция добавления данных в карточку
function addFormToCard () {
  const addCardsInput = {
    name: placeInput.value,
    link: linkInput.value,
  }
  elementContainer.prepend(creatCard(addCardsInput));
  document.addEventListener("keydown", preventDefaultEnter);
  closePopup(popupEditCard);
};

formTypeAdd.addEventListener("submit", addFormToCard);


// функция предотвратить ввод Enter по умолчанию
function preventDefaultEnter (evt) {
    if (evt.key === "Enter"){
      evt.preventDefault();
    }
}

// функция удаления карточки
function handleDelCard(evt){
  evt.target.closest(".element").remove();
}

// функция лайка
function handleLikeCard (evt) {
  evt.target.classList.toggle("element__like_enable");
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
