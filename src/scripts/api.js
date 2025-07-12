const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-42',
  headers: {
    authorization: '8952ff94-e755-4840-9233-6c09e794ec1c',
    'Content-Type': 'application/json'
  }
}

export function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

export function getUserInfo () {
  return fetch(`${config.baseUrl}/users/me`, {
  method: 'GET',
  headers: config.headers
})
  .then(checkResponse)
}

export function getInitialCards () {
  return fetch(`${config.baseUrl}/cards`, {
  method: 'GET',
 headers: config.headers
})
  .then(checkResponse)
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
    .then(checkResponse)
}

export function postNewCard(name, link) {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link
    })
  })
    .then(checkResponse)
}

export function deleteCardById(cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`,{
    method: 'DELETE',
    headers: config.headers,
  })
   .then(checkResponse)
}

export function likeCard (cardId) {
  return fetch (`${config.baseUrl}/cards/likes/${cardId}`,{
    method: 'PUT',
    headers: config.headers,
  })
   .then(checkResponse)
}

export function dislikeCard (cardId) {
  return fetch (`${config.baseUrl}/cards/likes/${cardId}`,{
    method: 'DELETE',
    headers: config.headers,
  })
   .then(checkResponse)
}

export function updateUserAvatar(avatarUrl) {
  return fetch (`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatarUrl
    })
 })
   .then(checkResponse)
}
