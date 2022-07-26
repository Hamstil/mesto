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
const cardsElementTemplate = document.querySelector(".cards-element").content.querySelector(".element");

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
  defaultProfileValue();
});

// событие по кнопке добавления карточки
profileAddCardButton.addEventListener("click", function () {
  placeInput.value = '';
  linkInput.value = '';
  openPopup(popupEditCard);
});

// Функция перебора кнопок и нахождения popup для закрытия
popupCloseBotton.forEach((button) => {
  const currntPopup = button.closest(".popup");
  button.addEventListener("click", () => {
    closePopup(currntPopup);
  });
});


//функция значений из профиля по умолчанию
function defaultProfileValue() {
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
formTypeEdit.addEventListener("submit", formAddProfile);

// функция создания карточки
function creatCard (itemCard) {

  const cardTemplate = cardsElementTemplate.cloneNode(true);

  const cardImage = cardTemplate.querySelector(".element__image");
  const cardTitle = cardTemplate.querySelector(".element__title");
  const buttonDel = cardTemplate.querySelector(".element__trash");
  const buttonLike = cardTemplate.querySelector(".element__like");
  const imageElement = cardTemplate.querySelector(".element__image");

  cardImage.src = itemCard.link;
  cardImage.alt = itemCard.name;
  cardTitle.textContent = itemCard.name;

  buttonDel.addEventListener("click", delCard);
  buttonLike.addEventListener("click", likeCard);
  imageElement.addEventListener("click", viewImageCard);

  return cardTemplate;
}

// функция добавления данных в карточку
function formAddToCard (evt) {
  evt.preventDefault();
  const addCardsInput = {
    name: placeInput.value,
    link: linkInput.value,
  }
  elementConteiner.prepend(creatCard(addCardsInput));
  closePopup(popupEditCard);
}
formTypeAdd.addEventListener("submit", formAddToCard);


// функция удаления карточки
function delCard(evt){
  evt.target.closest(".element").remove();
}

// функция лайка
function likeCard (evt) {
  evt.target.classList.toggle("element__like_enable");
}

//Функция отображения карточек по уполчанию
function defaultCards () {
  initialCards.forEach((card) => {
    elementConteiner.append(creatCard(card));
  });
}
defaultCards();

// функция отображения картинки на весь экран
function viewImageCard (evt) {
  const currentViewImage = popupViewImage;
  const imgPopup = currentViewImage.querySelector(".popup__image");
  const titlePopup = currentViewImage.querySelector(".popup__text");
  const currentTitle = evt.target.closest(".element").querySelector(".element__title");
  imgPopup.src = evt.target.src;
  imgPopup.alt = evt.target.alt;
  titlePopup.textContent = currentTitle.textContent;
  openPopup(currentViewImage);
}















