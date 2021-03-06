const profileEditBotton = document.querySelector(".profile__edit-button");
const popupElement = document.querySelector(".popup");
const popupCloseBotton = document.querySelector(".popup__close");

// Выберите элементы, куда должны быть вставлены значения полей
let profileTitle = document.querySelector(".profile__title");
let profileSubtitle = document.querySelector(".profile__subtitle");

// Находим форму в DOM
let formElement = document.querySelector(".popup-form");
// Находим поля формы в DOM
let nameInput = document.querySelector(".popup-form__input_text_name");
let jobInput = document.querySelector(".popup-form__input_text_job");

function openPopup () {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
  popupElement.classList.add("popup_is-opened");
}

function closePopup () {
  popupElement.classList.remove("popup_is-opened");
}

profileEditBotton.addEventListener("click" , openPopup);
popupCloseBotton.addEventListener("click", closePopup);

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                           // Так мы можем определить свою логику отправки.
                           // О том, как это делать, расскажем позже.

    // Вставьте новые значения с помощью textContent
    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = jobInput.value;
    closePopup();
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);
