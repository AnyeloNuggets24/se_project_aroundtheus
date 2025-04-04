import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._modalForm = this._popupElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
    this._setEventListeners;
  }

  close() {
    this._modalForm.reset();
    super.close();
  }

  _setEventListeners() {
    this._modalForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._modalForm);
    });
  }
}

// index.js

const newCardPopup = new PopupWithForm("#add-card-modal", (form) => {
  console.log(new FormData(form));
});
newCardPopup.open();

newCardPopup.close();
