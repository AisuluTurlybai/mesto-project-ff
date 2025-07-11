const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-42',
  headers: {
    authorization: '8952ff94-e755-4840-9233-6c09e794ec1c',
    'Content-Type': 'application/json'
  }
}

export function getUserInfo () {
  return fetch(`${config.baseUrl}/users/me`, {
  method: 'GET',
  headers: config.headers
})
  .then(res => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    });
}

export function getInitialCards () {
  return fetch(`${config.baseUrl}/cards`, {
  method: 'GET',
 headers: config.headers
})
  .then(res => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    });
}

export function updateUserInfo(name, about) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about
    })
  })
    .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`));
}

export function postNewCards(name, link) {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link
    })
  })
    .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`));
}

export function deleteCardById(cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`,{
    method: 'DELETE',
    headers: config.headers,
  })
   .then(res => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    });
}

export function likeCard (cardId) {
  return fetch (`${config.baseUrl}/cards/likes/${cardId}`,{
    method: 'PUT',
    headers: config.headers,
  })
     .then(res => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    });
}

export function dislikeCard (cardId) {
  return fetch (`${config.baseUrl}/cards/likes/${cardId}`,{
    method: 'DELETE',
    headers: config.headers,
  })
     .then(res => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    });
}

export function updateUserAvatar(avatarUrl) {
  return fetch (`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatarUrl
    })
 })
    .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`));
}
