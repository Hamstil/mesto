import './index.css';
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
    formTypeEdit, formTypeAdd } from '../utils/data.js';

// функция рендера картинок по умолчанию
const creatDefaultCards = new Section({items: initialCards, renderer: creatCards}, elementContainer);
creatDefaultCards.renderItems();

// функция создания карточки
function creatCards (item) {
  const newCard = new Card(item, ".cards-element", viewImageCard);
  creatDefaultCards.addItem(newCard.generateCard());
}

const modalPopupAdd = new PopupWithForm(popupEditCard, (dataInputs) => {
  creatDefaultCards.renderer(dataInputs);
});
modalPopupAdd.setEventListenersForm();


// событие по кнопке добавления карточки
profileAddCardButton.addEventListener("click", function () {
  formTypeAdd.reset();
  enableValidatorTypeAdd.clearError();
  modalPopupAdd.open();
});

const user = new UserInfo({nameInput: profileTitle, jobInput: profileSubtitle});
const modalPopupProfile = new PopupWithForm(popupEditProfile, (dataInputs) => {
  user.setUserInfo(dataInputs);
});
modalPopupProfile.setEventListenersForm();


// событие по кнопке редактирование профиля
profileEditButton.addEventListener("click" , function () {
  formTypeEdit.reset();
  enableValidatorTypeEdit.clearError();
  modalPopupProfile.open();
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


