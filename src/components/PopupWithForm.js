import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector);
    this._modalForm = this._popupElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
  }

  setEventListeners() {
    super.setEventListeners(); // don't forget base close logic
    this._modalForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._modalForm); // pass actual form element
      this.close();
    });
  }

  _getInputValues() {
    const inputs = Array.from(this._modalForm.querySelectorAll("input"));
    const values = {};
    inputs.forEach((input) => (values[input.name] = input.value));
    return values;
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
