const profileEditBotton = document.querySelector(".profile__edit-button");
const profileAddCardButton = document.querySelector(".profile__add-card-button");
const elementImage = document.querySelector(".element__image");
const popupViewImage = document.querySelector(".popup_view_image");
// const popupElement = Array.from(document.querySelectorAll(".popup"));
// const popupCloseBotton = Array.from(document.querySelectorAll(".popup__close"));
const popupEditProfile = document.querySelector(".popup_edit_profile");
const popupEditCard = document.querySelector(".popup_edit_card");
// Выберите элементы, куда должны быть вставлены значения полей
let profileTitle = document.querySelector(".profile__title");
let profileSubtitle = document.querySelector(".profile__subtitle");


// Находим поля формы в DOM
let nameInput = document.querySelector(".popup-form__input_text_name");
let jobInput = document.querySelector(".popup-form__input_text_job");
let namePlace = document.querySelector(".popup-form__input_text_name-place");
let placeLink = document.querySelector(".popup-form__input_text_place-link");

function openPopup (elemetPopup) {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
  namePlace.value = '';
  placeLink.value = '';
  elemetPopup.classList.add("popup_is-opened");
  const elemetPopupClose = elemetPopup.querySelector(".popup__close");
  elemetPopupClose.addEventListener("click", function (){
    elemetPopup.classList.remove("popup_is-opened");
  });

  function formSubmitHandler (evt) {
    evt.preventDefault();
    // Вставьте новые значения с помощью textContent
    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = jobInput.value;


      elemetPopup.classList.remove("popup_is-opened");

    }
    // Находим форму в DOM
    let formElementEditProfile = elemetPopup.querySelector(".popup-form");

    formElementEditProfile.addEventListener('submit', formSubmitHandler);
}

function openPopupImage(elemetPopup){
  elemetPopup.classList.add("popup_is-opened");
  const elemetPopupCloseImage = elemetPopup.querySelector(".popup__close");
  elemetPopupCloseImage.addEventListener("click", function (){
    elemetPopup.classList.remove("popup_is-opened");
  });
}

// при клике на элемент открытие нужного popup
profileEditBotton.addEventListener("click" , function(){
  openPopup(popupEditProfile);
});

profileAddCardButton.addEventListener("click", function(){
  openPopup(popupEditCard);
});

elementImage.addEventListener("click", function(){
  openPopupImage(popupViewImage);
});



