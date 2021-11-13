import {
    getResultFetch
} from './result-fetch';

const baseUrl = 'https://auth.nomoreparties.co';

export const register = (email, password) => {
    return fetch(`${baseUrl}/signup`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        })
        .then(getResultFetch)
};
export const login = (email, password) => {
    return fetch(`${baseUrl}/signin`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        })
        .then(getResultFetch)
        .then((data) => {
            localStorage.setItem('jwt', data.token)
            return data;
        })
};
export const checkToken = (token) => {
    return fetch(`${baseUrl}/users/me`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        })
        .then(getResultFetch)
}