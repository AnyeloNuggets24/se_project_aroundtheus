import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import "../pages/index.css";
import { initialCards } from "../components/ultil.js";
import { validationSettings } from "../components/ultil.js";

const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");

// Wrappers
const modals = document.querySelectorAll(".modal");
const cardsWrap = document.querySelector(".cards__list");
const profileEditModal = document.querySelector("#profile__edit-modal");
const addCardModal = document.querySelector("#add-card-modal");
const addCardCloseButton = addCardModal.querySelector(".modal__close");
const profileEditForm = document.forms["profile-form"];
const cardForm = document.forms["add-card-form"];

//Buttons and other DOM nodes
const profileEditButton = document.querySelector(".profile__edit-button");
const profileCloseButton = profileEditModal.querySelector(".modal__close");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const addNewCardButton = document.querySelector(".profile__add-button");

// Form Data
const nameInput = profileEditForm.querySelector(".modal__input_type_name");
const jobInput = profileEditForm.querySelector(
  ".modal__input_type_description"
);
const cardTitleInput = cardForm.querySelector(".modal__input_type_title");

const cardUrlInput = cardForm.querySelector(".modal__input_type_url");

const imageModal = document.querySelector("#image-modal");
const imageModalImgEl = imageModal.querySelector(".modal__image");
const imageModalText = document.querySelector(".modal__text");
const imageModalCloseButton = imageModal.querySelector(".modal__close");

const closeModal = (modal) => {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keyup", handleEscape);
};

const addCardValidator = new FormValidator(validationSettings, cardForm);
const editProfileValidator = new FormValidator(
  validationSettings,
  profileEditForm
);

addCardValidator.enableValidation();
editProfileValidator.enableValidation();

function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keyup", handleEscape);
}

function renderCard(cardData, wrapper) {
  const cardElement = new Card(cardData, "#card-template", handleImageClick);
  wrapper.prepend(cardElement.getView());
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeModal(profileEditModal);
}

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  renderCard({ name, link }, cardsWrap);
  closeModal(addCardModal);
  cardForm.reset();
  // disable right after reseting the
  addCardValidator.disableButton();
}

function handleEscape(evt) {
  if (evt.key === "Escape") {
    const activeModal = document.querySelector(".modal_opened");
    closeModal(activeModal);
  }
}

const handleModalClose = (evt) => {
  if (
    evt.target.classList.contains("modal") ||
    evt.target.classList.contains("modal__close")
  ) {
    closeModal(evt.currentTarget);
  }
};

function handleImageClick(data) {
  imageModalImgEl.src = data.link;
  imageModalImgEl.alt = data.name;
  imageModalText.textContent = data.name;
  openModal(imageModal);
}

modals.forEach((modal) => {
  modal.addEventListener("mousedown", handleModalClose);
});

// form listener

profileEditForm.addEventListener("submit", handleProfileFormSubmit);
cardForm.addEventListener("submit", handleAddCardFormSubmit);

profileEditButton.addEventListener("click", () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openModal(profileEditModal);
});

//add new card button

addNewCardButton.addEventListener("click", () => openModal(addCardModal));
// addCardModalCloseButton.addEventListener("click", () =>
// closeModal(addCardModal)
// );

initialCards.forEach((cardData) => renderCard(cardData, cardsWrap));
