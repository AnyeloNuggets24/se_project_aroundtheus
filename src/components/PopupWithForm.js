import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector);
    this._modalForm = this._popupElement.querySelector(".modal__form");
    this._inputlist = this._modalForm.querySelectorAll(".modal__input");
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
    const values = {};
    this._inputlist.forEach((input) => (values[input.name] = input.value));
    return values;
  }

  setEventListeners() {
    this._modalForm.addEventListener("submit", () => {
      this._handleFormSubmit(this._getInputValues()); // pass them instead of the form
      this.close();
    });
    super.setEventListeners(); // don't forget base close logic
  }

  // Close and reset form
  close() {
    this._modalForm.reset();
    super.close();
  }

  // Handle submit
  // create a listenner for the submit event
  // After submiting form  we close our pop

  // close() {
  //   this._modalForm.reset();
  //   super.close();
  // }

  // open() {
  //   this._popupElement.classList.add("modal_open");
  //   document.addEventListener("keydown", this._handleEscClose);
  // }

  // setEventListeners() {
  //   super.setEventListeners();
  //   this._modalForm.addEventListener("submit", (evt) => {
  //     evt.preventDefault();
  //     this._handleFormSubmit(this._modalForm);
  //     this.close();
  //   });
  // }
}

// index.js
