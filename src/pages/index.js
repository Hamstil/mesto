import './index.css';
import { Api } from '../components/Api.js';
import { Card } from '../components/Card.js';
import { FromValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm }  from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import { objectFromValidation,
  popupEditProfile, popupEditCard, popupViewImage, popupEditAvatar,
   elementContainer, profileTitle, profileSubtitle, profileAvatarImage,
   profileEditButton, profileAddCardButton, profileAddAvatarButton, formTypeEdit, formTypeAdd, formTypeAvatar, configApi } from '../utils/data.js';
import FormValidator from 'd:/download/mesto-main10/mesto-main/src/components/formvalidator';

let profileId = null;

// Создание класса api
const api = new Api(configApi);

const user = new UserInfo({nameInput: profileTitle, jobInput: profileSubtitle, avatarSelector: profileAvatarImage});

api.getAllInfo().then(([profileData, cardData]) => {
  user.setUserInfo(profileData);
  profileId = profileData._id;
  initialCardsList.renderItems(cardData);
})
.catch((err) => {
  console.log((`Ошибка ${err}`));
  });

const initialCardsList = new Section({ renderer: createCard}, elementContainer);

// функция создания карточки
function createCard (item) {
  const newCard = new Card({data: item, cardTemlateSelector: ".cards-element",
   viewImageCard: (name, link) => {
    popupWithImage.open(name, link);
  },
   handleDeleteCard: (cardId) => {
    api.deleteCard(cardId).then(() => {
      newCard.deleteCard();
    }).catch((err) => {console.log((`Ошибка ${err}`))})
   },
  profileId: profileId
  });
  initialCardsList.addItem(newCard.generateCard());
  return newCard;
}

// добавление карточки
const modalPopupAdd = new PopupWithForm(popupEditCard, (dataInputs) => {
  modalPopupAdd.renderLoading(true);
  api.addNewCard(dataInputs)
  .then((dataInputs) => {
    createCard(dataInputs);
    validatorTypeAdd.disabledButton();
  })
  .catch((err) => {console.log(`Ошибка ${err}`)})
  .finally(() => {
    modalPopupAdd.renderLoading(false);
  })

});
modalPopupAdd.setEventListenersForm();

// событие по кнопке добавления карточки
profileAddCardButton.addEventListener("click", function () {
  validatorTypeAdd.clearError();
  modalPopupAdd.open();
});


const modalPopupProfile = new PopupWithForm(popupEditProfile, (dataInputs) => {
  modalPopupProfile.renderLoading(true);
  api.editProfile(dataInputs)
  .then((data) => {
    user.setUserInfo(data);
    validatorTypeEdit.disabledButton();
  })
  .catch((err) => {console.log(`Ошибка ${err}`)})
  .finally(() => {
    modalPopupProfile.renderLoading(false);
  })

});
modalPopupProfile.setEventListenersForm();


// событие по кнопке редактирование профиля
profileEditButton.addEventListener("click" , function () {
  modalPopupProfile.setInputValues(user.getUserInfo());
  validatorTypeEdit.clearError();
  modalPopupProfile.open();
});


// Попап смены аватара
const modalPopupProfileAvatar = new PopupWithForm(popupEditAvatar, (dataInputs) => {
  modalPopupProfileAvatar.renderLoading(true);
  api.editAvatar(dataInputs)
  .then((dataInputs) => {
    user.setUserInfo(dataInputs);
  })
  .catch((err) => {console.log(`Ошибка ${err}`)})
  .finally(() => {
    modalPopupProfileAvatar.renderLoading(false);
  })

});
modalPopupProfileAvatar.setEventListenersForm();

profileAddAvatarButton.addEventListener("click", function() {
  validatorTypeAvatar.clearError();
  modalPopupProfileAvatar.open();
});


// попап
const popupWithImage = new PopupWithImage(popupViewImage);
popupWithImage.setEventListeners();




// валидация формы обнавления аватара
const validatorTypeAvatar = new FromValidator(objectFromValidation, formTypeAvatar);
validatorTypeAvatar.enableValidation();
// валидация формы редактирования профиля
const validatorTypeEdit = new FromValidator(objectFromValidation, formTypeEdit);
validatorTypeEdit.enableValidation();
// валидация формы добавления карточки
const validatorTypeAdd = new FromValidator(objectFromValidation, formTypeAdd);
validatorTypeAdd.enableValidation();


