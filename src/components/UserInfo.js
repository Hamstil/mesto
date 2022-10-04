export class UserInfo {
  constructor({nameInput, jobInput}) {
    this._name = document.querySelector(nameInput);
    this._description = document.querySelector(jobInput);
  }

  getUserInfo () {
    return {
      name: this._name.textContent,
      about: this._description.textContent
    }
  }

  setUserInfo(data) {
    ({name: this._name.textContent, about: this._description.textContent} = data);
  }
}
