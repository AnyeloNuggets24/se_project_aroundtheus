export default class Card {
  constructor({ name, link }, cardSelector) {
    this.name = name;
    this.link = link;
    this._cardSelector = cardSelector;
  }

  _setEventListeners() {
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

    console.log(deleteButton);
  }

  _handleDeleteCard() {
    this._cardElement.remove();
    this._cardElement.null();
  }
  _handleLikeIcon() {
    this._cardElement
      .querySelector(".card__like-button")
      .classList.toggle(".card__like_button_is-active");
  }

  getView() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    console.log(this._cardElement);
    //get Card view
    //set eventlistener
    this._setEventListeners();
    //return the card
  }
}
