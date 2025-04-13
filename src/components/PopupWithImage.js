import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupsSelector) {
    super(popupsSelector);
    this._imageElement = this._popupElement.querySelector(".modal__image");
    this._textElement = this._popupElement.querySelector(".modal__text");
  }

  open({ name, link }) {
    this._imageElement.src = link;
    this._imageElement.alt = name;
    this._textElement.textContent = name;
    super.open();
  }
}
