export class FromValidator {
  constructor(objectFormValid, formElement){
      this._objectFormValid = objectFormValid;
      this._formElement = formElement;
  }

  // фунция включения валидации
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

  // проверка поля на валидность
  _isValid(inputElement){
    if (!inputElement.validity.valid){
      this._showInputError(inputElement, inputElement.validationMessage);
    }
    else {
      this._hideInputError(inputElement);
    }
  }

  // функция показа ошибки
  _showInputError(inputElement, errorMessage){
    this._error = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._objectFormValid.inputErrorClass);
    this._error.textContent = errorMessage;
    this._error.classList.add(this._objectFormValid.errorClass);
  }

  // функция скрытия ошибки
  _hideInputError(inputElement){
    this._error = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._objectFormValid.inputErrorClass);
    this._error.classList.remove(this._objectFormValid.errorClass);
    this._error.textContent = '';
  }

  // проверка двух полей на валидность для переключения состояния кнопки
  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
          return !inputElement.validity.valid;
        });
  }

  // функция переключение состояния кнопки
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

  // функция отчистки ошибок
  clearError() {
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
    this.disabledButton();
  }
}
