export default class Card {
  constructor({ name, link }, cardSelector, handleImageClick) {
    this.name = name;
    this.link = link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  _setEventListeners() {
    this._cardImage.addEventListener("click", () => {
      this._handleImageClick(this);
    });

    // card__like-button
    const likeButton = this._cardElement
      .querySelector(".card__like-button")
      .addEventListener("click", () => {
        this._handleLikeIcon();
        console.log(likeButton);
      });

    // card__delete-button
    const deleteButton = this._cardElement.querySelector(
      ".card__delete-button"
    );
    deleteButton.addEventListener("click", () => {
      this._handleDeleteCard();
    });
  }

  _handleDeleteCard() {
    this._cardElement.remove();
  }
  _handleLikeIcon() {
    this._cardElement
      .querySelector(".card__like-button")
      .classList.toggle("card__like_button_is-active");
  }

  getView() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    console.log(this._cardElement);

    this._cardImage = this._cardElement.querySelector(".card__image");
    this._cardTitle = this._cardElement.querySelector(".card__title");

    this._cardImage.src = this.link;
    this._cardImage.alt = this.name;
    this._cardTitle.textContent = this.name;
    //set eventlistener
    this._setEventListeners();
    return this._cardElement;
  }
}
