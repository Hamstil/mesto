export class UserInfo {
  constructor({nameInput, jobInput, avatarSelector}) {
    this._name = document.querySelector(nameInput);
    this._description = document.querySelector(jobInput);
    this._avatar = document.querySelector(avatarSelector);
  }

  getUserInfo () {
    return {
      name: this._name.textContent,
      about: this._description.textContent,
      avatar: this._avatar.src
    }
  }

  setUserInfo(data) {
    ({name: this._name.textContent,
      about: this._description.textContent,
      avatar: this._avatar.src } = data);
  }
}
