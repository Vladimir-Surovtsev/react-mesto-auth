import {
    getResultFetch
} from './result-fetch';

class Api {
    constructor(key, baseUrl) {
        this._key = key;
        this._baseUrl = baseUrl;
    }

    getUserInfo() {
        return fetch(`${this._baseUrl}users/me`, {
                headers: {
                    authorization: this._key,
                    'Content-Type': 'application/json'
                }
            })
            .then(getResultFetch)
    }

    getInitialCards() {
        return fetch(`${this._baseUrl}cards`, {
                headers: {
                    authorization: this._key,
                    'Content-Type': 'application/json'
                }
            })
            .then(getResultFetch)
    }

    editProfile(userName, aboutUser) {
        return fetch(`${this._baseUrl}users/me`, {
                method: 'PATCH',
                headers: {
                    authorization: this._key,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: userName,
                    about: aboutUser
                })
            })
            .then(getResultFetch)
    }

    initialNewCard(cardName, cardLink) {
        return fetch(`${this._baseUrl}cards`, {
                method: 'POST',
                headers: {
                    authorization: this._key,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: cardName,
                    link: cardLink
                })
            })
            .then(getResultFetch)
    }

    changeLikeCardStatus(id, like) {
        return fetch(`${this._baseUrl}cards/likes/${id}`, {
                method: like ? 'PUT' : 'DELETE',
                headers: {
                    authorization: this._key,
                    'Content-Type': 'application/json',
                },
            })
            .then(getResultFetch)
    }

    deleteCard(id) {
        return fetch(`${this._baseUrl}cards/${id}`, {
                method: 'DELETE',
                headers: {
                    authorization: this._key,
                    'Content-Type': 'application/json'
                }
            })
            .then(getResultFetch)
    }

    changeAvatar(avatarLink) {
        return fetch(`${this._baseUrl}users/me/avatar`, {
                method: 'PATCH',
                headers: {
                    authorization: this._key,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    avatar: avatarLink
                })
            })
            .then(getResultFetch)
    }

}

const api = new Api('fc57bca5-e75f-42a0-83ef-a595f3326172', 'https://mesto.nomoreparties.co/v1/cohort-26/');

export default api;