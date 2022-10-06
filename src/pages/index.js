import './index.css';
import { Api } from '../components/Api.js';
import { Card } from '../components/Card.js';
import { FromValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm }  from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import { objectFromValidation,
  popupEditProfile, popupEditCard, popupViewImage,
   profileTitle, profileSubtitle, elementContainer,
   profileEditButton, profileAddCardButton,
    formTypeEdit, formTypeAdd, configApi } from '../utils/data.js';

let profileId = null;

// Создание класса api
const api = new Api(configApi);

const user = new UserInfo({nameInput: profileTitle, jobInput: profileSubtitle});

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




const modalPopupAdd = new PopupWithForm(popupEditCard, (dataInputs) => {
  modalPopupAdd.renderLoading(true);
  api.addNewCard(dataInputs)
  .then((dataInputs) => {
    initialCardsList.addItem(createCard(dataInputs));
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

const popupWithImage = new PopupWithImage(popupViewImage);
popupWithImage.setEventListeners();







// валидация формы редактирования профиля
const validatorTypeEdit = new FromValidator(objectFromValidation, formTypeEdit);
validatorTypeEdit.enableValidation();
// валидация формы добавления карточки
const validatorTypeAdd = new FromValidator(objectFromValidation, formTypeAdd);
validatorTypeAdd.enableValidation();


