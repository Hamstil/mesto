// Выбор всех форм полей ввода и элементов для ошибок
const objectFromValidation = {
  formSelector: '.popup-form',
  inputSelector: '.popup-form__input',
  submitButtonSelector: '.popup-form__button',
  inactiveButtonClass: 'popup-form__button_disabled',
  inputErrorClass: 'popup-form__input_type_error',
  errorClass: 'popup-form__error_active'
};

enableFormValidation(objectFromValidation);

// функция включения валидации
function enableFormValidation (objectFromValidation) {
  const formList = Array.from(document.querySelectorAll(objectFromValidation.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListenters(formElement, objectFromValidation);
  });

};

// функция слушатель событий ввода

function setEventListenters (formElement, objectFromValidation) {
  // находим все поля форм
  const inputList = Array.from(formElement.querySelectorAll(objectFromValidation.inputSelector));
  const buttonElement = formElement.querySelector(objectFromValidation.submitButtonSelector);

  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      isValid(formElement, inputElement, objectFromValidation);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

// функция валидации
function isValid (formElement, inputElement, objectFromValidation) {
  if (!inputElement.validity.valid){
    showInputError(formElement, inputElement, inputElement.validationMessage, objectFromValidation);
  }
  else {
    hideInputError(formElement, inputElement, objectFromValidation);
  }
};

// функция показа ошибки
function showInputError (formElement, inputElement, errorMessage, objectFromValidation) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(objectFromValidation.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(objectFromValidation.errorClass);
};

// функция скрытия ошибки
function hideInputError (formElement, inputElement, objectFromValidation) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(objectFromValidation.inputErrorClass);
  errorElement.classList.remove(objectFromValidation.errorClass);
  errorElement.textContent = '';
};

// функция проверки формы на валидность
function hasInvalidInput (inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

// функция включения кнопки в зависимости валидности формы
function toggleButtonState (inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.setAttribute("disabled", "disabled");
    buttonElement.classList.add("popup-form__button_disabled");
  }
  else {
    buttonElement.removeAttribute("disabled");
    buttonElement.classList.remove("popup-form__button_disabled");
  }
};


// функция отчистки ошибок формы
function clearError (objectFromValidation) {
  const errors = document.querySelectorAll(`.${objectFromValidation.errorClass}`);
  errors.forEach((error) => {
    error.classList.remove(objectFromValidation.errorClass);
    error.textContent ='';
  });
  const inputErrors = document.querySelectorAll(`.${objectFromValidation.inputErrorClass}`);
  inputErrors.forEach((inputError) => {
    inputError.classList.remove(objectFromValidation.inputErrorClass);
  });
};
