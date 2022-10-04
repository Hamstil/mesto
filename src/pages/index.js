import './index.css';
import { Api } from '../components/Api.js';
import { Card } from '../components/Card.js';
import { FromValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm }  from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import { initialCards, objectFromValidation,
  popupEditProfile, popupEditCard, popupViewImage,
   profileTitle, profileSubtitle, elementContainer,
   profileEditButton, profileAddCardButton,
    formTypeEdit, formTypeAdd, configApi } from '../utils/data.js';

// Создание класса api
const api = new Api(configApi);

api.getUserInfo()
  .then((data) => {
    user.setUserInfo(data);
  }).catch((err) => {console.log(`Ошибка ${err}`)});

api.getInitialCards()
  .then((data) => {
    console.log(data);
  }).catch((err) => {console.log((`Ошибка ${err}`))});

// функция создания карточки
function createCard (item) {
  const newCard = new Card(item, ".cards-element", viewImageCard).generateCard();
  initialCardsList.addItem(newCard);
  return newCard;
}

const initialCardsList = new Section({items: initialCards, renderer: createCard}, elementContainer);
initialCardsList.renderItems();

const modalPopupAdd = new PopupWithForm(popupEditCard, (dataInputs) => {
  initialCardsList.addItem(createCard(dataInputs));
  validatorTypeAdd.disabledButton();
});
modalPopupAdd.setEventListenersForm();


// событие по кнопке добавления карточки
profileAddCardButton.addEventListener("click", function () {
  validatorTypeAdd.clearError();
  modalPopupAdd.open();
});

const user = new UserInfo({nameInput: profileTitle, jobInput: profileSubtitle});
const modalPopupProfile = new PopupWithForm(popupEditProfile, (dataInputs) => {
  user.setUserInfo(dataInputs);
  validatorTypeEdit.disabledButton();
});
modalPopupProfile.setEventListenersForm();


// событие по кнопке редактирование профиля
profileEditButton.addEventListener("click" , function () {
  modalPopupProfile.setInputValues(user.getUserInfo());
  validatorTypeEdit.clearError();
  modalPopupProfile.open();
});

const popupWithImage = new PopupWithImage(popupViewImage);
popupWithImage.setEventListeners();

// функция отображения картинки на весь экран
function viewImageCard (name, link) {
  popupWithImage.open(name, link);
}


// валидация формы редактирования профиля
const validatorTypeEdit = new FromValidator(objectFromValidation, formTypeEdit);
validatorTypeEdit.enableValidation();
// валидация формы добавления карточки
const validatorTypeAdd = new FromValidator(objectFromValidation, formTypeAdd);
validatorTypeAdd.enableValidation();


