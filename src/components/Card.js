export default class Card {
  constructor(
    { data, userId, handleImageClick, handleDelete, handleLikeClick },
    cardSelector
  ) {
    this._data = data;
    this._userId = userId;
    this._handleImageClick = handleImageClick;
    this._handleDelete = handleDelete;
    this._handleLikeClick = handleLikeClick;
    this._cardSelector = cardSelector;

    this._isLiked = data.isLiked;
    this._ownerId = data.owner._id;
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  isLiked() {
    return this._isLiked;
  }

  updateLikeStatus(isLiked) {
    this._isLiked = isLiked;
    this._updateLikeState();
  }

  _updateLikeState() {
    if (this.isLiked()) {
      this._likeButton.classList.add("card__like-button_active");
    } else {
      this._likeButton.classList.remove("card__like-button_active");
    }
  }

  _setEventListeners() {
    this._cardImage.addEventListener("click", () => this._handleImageClick());

    if (this._ownerId === this._userId) {
      this._deleteButton.addEventListener("click", () => this._handleDelete());
    } else {
      this._deleteButton.remove();
    }

    this._likeButton.addEventListener("click", () => {
      this._handleLikeClick(this._data._id, this.isLiked(), this);
    });
  }

  getView() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector(".card__image");
    this._cardTitle = this._element.querySelector(".card__title");
    this._likeButton = this._element.querySelector(".card__like-button");
    this._deleteButton = this._element.querySelector(".card__delete-button");

    this._cardTitle.textContent = this._data.name;
    this._cardImage.src = this._data.link;
    this._cardImage.alt = this._data.name;

    this._updateLikeState();
    this._setEventListeners();

    return this._element;
  }

  remove() {
    this._element.remove();
    this._element = null;
  }
}
