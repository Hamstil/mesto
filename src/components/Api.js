export class Api {

    #onResponce(res) {
      if(res.ok){
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`)
    }

    constructor(config){
      this._url = config.url;
      this._headers = config.headers;
    }

    // получение всей информации пользователя и карточки
    getAllInfo() {
      return Promise.all([this.getUserInfo(), this.getInitialCards()]);
    }

    // Получение с сервера данных о пользователе
    getUserInfo() {
      return fetch(`${this._url}/users/me`,
      { method: 'GET',
        headers: this._headers})
        .then(this.#onResponce)
    }

    // Получение первоночальных карточек
    getInitialCards() {
      return fetch(`${this._url}/cards`,
      { method: 'GET',
        headers: this._headers})
        .then(this.#onResponce)
    }

    // Изменение информации профиля
    editProfile(data) {
      return fetch(`${this._url}/users/me`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          name: data.name,
          about: data.about
        })
      })
      .then(this.#onResponce)
    }

    // Создание новой карточки
    addNewCard(data) {
      return fetch(`${this._url}/cards`, {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify({
          name: data.name,
          link: data.link
        })
      })
      .then(this.#onResponce)
    }

    // Удаление карточки
    deleteCard(cardId) {
      return fetch(`${this._url}/cards/${cardId}`, {
        method: 'DELETE',
        headers: this._headers
      })
      .then(this.#onResponce)
    }


}
