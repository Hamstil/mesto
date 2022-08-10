// Выбор popup элементвов по модификаторам
const popupEditProfile = document.querySelector(".popup_edit_profile");
const popupEditCard = document.querySelector(".popup_edit_card");
const popupViewImage = document.querySelector(".popup_view_image");

// элементы popup_view_image
const imgPopup = popupViewImage.querySelector(".popup__image");
const titlePopup = popupViewImage.querySelector(".popup__text");

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

// Выбор элементов, куда должны быть вставлены значения полей
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");

// Выбор контейнера под шаблон и сам шаблон
const elementConteiner = document.querySelector(".elements-content");
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
}

//функция закрытия popup
function closePopup (popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closePopupByEsc);
}

//функция закрытия popup по esc
function closePopupByEsc (evt) {
  const currentPopup = document.querySelector('.popup_is-opened');
  if (evt.key === 'Escape'){
    closePopup(currentPopup);
  }
}

// событие по кнопке редактирование профиля
profileEditBotton.addEventListener("click" , function () {
  getProfileValue();
  openPopup(popupEditProfile);
});

//функция значений из профиля по умолчанию
function getProfileValue() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
}

// событие по кнопке добавления карточки
profileAddCardButton.addEventListener("click", function () {
  formTypeAdd.reset();
  openPopup(popupEditCard);
});

// Функция перебора кнопок и нахождения popup для закрытия
popupCloseBotton.forEach((button) => {
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

  const cardTemplate = cardsElementTemplate.cloneNode(true);

  const cardImage = cardTemplate.querySelector(".element__image");
  const cardTitle = cardTemplate.querySelector(".element__title");
  const buttonDel = cardTemplate.querySelector(".element__trash");
  const buttonLike = cardTemplate.querySelector(".element__like");

  cardImage.src = itemCard.link;
  cardImage.alt = itemCard.name;
  cardTitle.textContent = itemCard.name;

  buttonDel.addEventListener("click", delCard);
  buttonLike.addEventListener("click", likeCard);
  cardImage.addEventListener("click", viewImageCard);

  return cardTemplate;
}

// функция добавления данных в карточку
function addFormToCard (evt) {
  evt.preventDefault();
  const addCardsInput = {
    name: placeInput.value,
    link: linkInput.value,
  }
  elementConteiner.prepend(creatCard(addCardsInput));
  closePopup(popupEditCard);
}
formTypeAdd.addEventListener("submit", addFormToCard);


// функция удаления карточки
function delCard(evt){
  evt.target.closest(".element").remove();
}

// функция лайка
function likeCard (evt) {
  evt.target.classList.toggle("element__like_enable");
}

//Функция отображения карточек по уполчанию
function creatDefaultCards () {
  initialCards.forEach((card) => {
    elementConteiner.append(creatCard(card));
  });
}
creatDefaultCards();

// функция отображения картинки на весь экран
function viewImageCard (evt) {
  const currentViewImage = popupViewImage;
  imgPopup.src = evt.target.src;
  imgPopup.alt = evt.target.alt;
  titlePopup.textContent = evt.target.alt;
  openPopup(currentViewImage);
}
