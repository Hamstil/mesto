export class Api {
    constructor(config){
      this._url = config.url;
      this._headers = config.headers;
    }

    // Получение с сервера данных о пользователе
    getUserInfo() {
      return fetch(`${this._url}/users/me`,
      {headers: this._headers})
        .then((res) => {
          if(res.ok){
            return res.json();
          }
          return Promise.reject(`Ошибка: ${res.status}`)
        })
    }

    // Получение первоночальных карточек
    getInitialCards() {
      return fetch(`${this._url}/cards`,
      {headers: this._headers})
        .then((res) => {
          if(res.ok){
            return res.json();
          }
          return Promise.reject(`Ошибка: ${res.status}`)
        })
    }
}
