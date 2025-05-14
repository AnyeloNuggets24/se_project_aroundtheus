class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then(this._handleResponse);
  }

  setUserInfo(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then(this._handleResponse);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then(this._handleResponse);
  }

  addCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then(this._handleResponse);
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._handleResponse);
  }

  likeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
    }).then(this._handleResponse);
  }

  unlikeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._handleResponse);
  }

  updateAvatar(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then(this._handleResponse);
  }
}

export const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "a3ba7fe6-d8d6-4fc9-a80b-33e779685270",
    "Content-Type": "application/json",
  },
});

// Sample card data
const userInfo = [
  {
    createdAt: "2023-07-05T08:10:57.741Z",
    isLiked: false,
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
    name: "Yosemite Valley",
    owner: "e20537ed11237f86bbb20ccb",
    _id: "5d1f0611d321eb4bdcd707dd",
  },
  {
    createdAt: "2023-07-05T08:11:58.324Z",
    isLiked: false,
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
    name: "Lake Louise",
    owner: "e20537ed11237f86bbb20ccb",
    _id: "5d1f064ed321eb4bdcd707de",
  },
];

const userInfoJSON = JSON.stringify(userInfo);

console.log(userInfoJSON);
console.log(typeof userInfoJSON);
