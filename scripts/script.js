const profileEditBotton = document.querySelector(".profile__edit-button");
const popupElement = document.querySelector(".popup");
const popupCloseBotton = document.querySelector(".popup__close");

function openPopup () {
  popupElement.classList.add("pupup_is-opened");
}

function closePopup () {
  popupElement.classList.remove("pupup_is-opened");
}

function closePopupClickOnShadow (event) {
if (event.target === event.currentTarget){
    closePopup();
  }
}

profileEditBotton.addEventListener("click" , openPopup);
popupCloseBotton.addEventListener("click", closePopup);
popupElement.addEventListener("click", closePopupClickOnShadow);

// Находим форму в DOM
let formElement = document.querySelector(".pupup-form");
// Находим поля формы в DOM
let nameInput = document.querySelector(".pupup-form__input_name");
let jobInput = document.querySelector(".pupup-form__input_job");

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                           // Так мы можем определить свою логику отправки.
                           // О том, как это делать, расскажем позже.

    // Получите значение полей jobInput и nameInput из свойства value

    // Выберите элементы, куда должны быть вставлены значения полей

    // Вставьте новые значения с помощью textContent
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);
