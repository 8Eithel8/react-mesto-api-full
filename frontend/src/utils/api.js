// Для работы с API класс Api.
 class Api {
    constructor({baseUrl, headers}) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }
   // проверяем ответ
    _checkRes(res) {
        if (res.ok) {
            return res.json();
        }  else {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
    }

    //загружаем фото с сервера
    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'GET',
            headers: this._headers
        })
            .then(this._checkRes)
    }

    //добавляем аватар
    updateAvatar({avatar}) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar
            })
        })
            .then(this._checkRes)
    }

    //получаем инфу о пользователе с сервера
    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'GET',
            headers: this._headers
        })
            .then(this._checkRes)
    }

    //изменяем инфу о пользователе
    editUserInfo({name, about}) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name,
                about
            })
        })
            .then(this._checkRes)
    }

    //постим новую фотографию
    postNewCard({name, link}) {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name,
                link
            })
        })
            .then(this._checkRes)
    }

    //удалаяем фото
    removeCard(id) {
        return fetch(`${this._baseUrl}/cards/${id}`, {
            method: 'DELETE',
            headers: this._headers
        })
            .then(this._checkRes)
    }

     changeLikeCardStatus(id, isLiked) {
        const method = isLiked ? 'DELETE' : 'PUT'
         return fetch(`${this._baseUrl}/cards/${id}/likes`, {
             method: method,
             headers: this._headers
         })
             .then(this._checkRes)
     }
}

export const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-41',
    headers: {
        authorization: '25211fd8-3e01-4ad9-a1d8-b38f3a1a11d7',
        'Content-Type': 'application/json'
    }
});



