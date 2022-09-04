export class FromValidator {
  constructor(objectFormValid, formElement){
      this._objectFormValid = objectFormValid;
      this._formElement = formElement;
  }

  enableValidation() {
    this._setEventListeners();
  }

  // функция слушатель событий ввода
  _setEventListeners(){
    this._inputList = Array.from(this._formElement.querySelectorAll(this._objectFormValid.inputSelector));
    this._buttonElement = this._formElement.querySelector(this._objectFormValid.submitButtonSelector);

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid(inputElement);
        this._toggleButtonState();
      });
    });
  }

  _isValid(inputElement){
    if (!inputElement.validity.valid){
      this._showInputError(inputElement, inputElement.validationMessage);
    }
    else {
      this._hideInputError(inputElement);
    }
  }

  _showInputError(inputElement, errorMessage){
    this._error = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._objectFormValid.inputErrorClass);
    this._error.textContent = errorMessage;
    this._error.classList.add(this._objectFormValid.errorClass);
  }

  _hideInputError(inputElement){
    this._error = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._objectFormValid.inputErrorClass);
    this._error.classList.remove(this._objectFormValid.errorClass);
    this._error.textContent = '';
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
          return !inputElement.validity.valid;
        });
  }

  _toggleButtonState(){
    if (this._hasInvalidInput()){
      this.disabledButton();
    }
    else {
      this.activateButton();
    }
  }

    // функция отключения кнопки
  disabledButton () {
    this._buttonElement.setAttribute("disabled", "disabled");
    this._buttonElement.classList.add(this._objectFormValid.inactiveButtonClass);
  }
  // функция включения кнопки
  activateButton () {
    this._buttonElement.removeAttribute("disabled");
    this._buttonElement.classList.remove(this._objectFormValid.inactiveButtonClass);
  }

  clearError(){
    this._errors = document.querySelectorAll(`.${this._objectFormValid.errorClass}`);
    this._errors.forEach((error) => {
          error.classList.remove(this._objectFormValid.errorClass);
          error.textContent ='';
     });
    this.inputErrors = document.querySelectorAll(`.${this._objectFormValid.inputErrorClass}`);
    this.inputErrors.forEach((inputError) => {
        inputError.classList.remove(this._objectFormValid.inputErrorClass);
      });
  }
}


// // функция слушатель событий ввода

// function setEventListenters (formElement, objectFromValidation) {
//   // находим все поля форм
//   const inputList = Array.from(formElement.querySelectorAll(objectFromValidation.inputSelector));
//   const buttonElement = formElement.querySelector(objectFromValidation.submitButtonSelector);

//   toggleButtonState(inputList, buttonElement, objectFromValidation);

//   inputList.forEach((inputElement) => {
//     inputElement.addEventListener("input", function () {
//       isValid(formElement, inputElement, objectFromValidation);
//       toggleButtonState(inputList, buttonElement, objectFromValidation);
//     });
//   });
// };

// // функция валидации
// function isValid (formElement, inputElement, objectFromValidation) {
//   if (!inputElement.validity.valid){
//     showInputError(formElement, inputElement, inputElement.validationMessage, objectFromValidation);
//   }
//   else {
//     hideInputError(formElement, inputElement, objectFromValidation);
//   }
// };

// // функция показа ошибки
// function showInputError (formElement, inputElement, errorMessage, objectFromValidation) {
//   const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
//   inputElement.classList.add(objectFromValidation.inputErrorClass);
//   errorElement.textContent = errorMessage;
//   errorElement.classList.add(objectFromValidation.errorClass);
// };

// // функция скрытия ошибки
// function hideInputError (formElement, inputElement, objectFromValidation) {
//   const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
//   inputElement.classList.remove(objectFromValidation.inputErrorClass);
//   errorElement.classList.remove(objectFromValidation.errorClass);
//   errorElement.textContent = '';
// };

// // функция проверки формы на валидность
// function hasInvalidInput (inputList) {
//   return inputList.some((inputElement) => {
//     return !inputElement.validity.valid;
//   });
// };

// // функция отключения кнопки
// function disabledButton (buttonElement, objectFromValidation) {
//   buttonElement.setAttribute("disabled", "disabled");
//   buttonElement.classList.add(objectFromValidation.inactiveButtonClass);
// }
//  // функция включения кнопки
//  function activateButton (buttonElement, objectFromValidation) {
//     buttonElement.removeAttribute("disabled");
//     buttonElement.classList.remove(objectFromValidation.inactiveButtonClass);
//  }

// // функция включения кнопки в зависимости валидности формы
// function toggleButtonState (inputList, buttonElement, objectFromValidation) {
//   if (hasInvalidInput(inputList)) {
//     disabledButton(buttonElement, objectFromValidation);
//   }
//   else {
//     activateButton(buttonElement, objectFromValidation);
//   }
// };


// // функция отчистки ошибок формы
// function clearError (objectFromValidation) {
//   const errors = document.querySelectorAll(`.${objectFromValidation.errorClass}`);
//   errors.forEach((error) => {
//     error.classList.remove(objectFromValidation.errorClass);
//     error.textContent ='';
//   });
//   const inputErrors = document.querySelectorAll(`.${objectFromValidation.inputErrorClass}`);
//   inputErrors.forEach((inputError) => {
//     inputError.classList.remove(objectFromValidation.inputErrorClass);
//   });
// };
