import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

const cardData = {
  name: "Yosemite Valley",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
};

const card = new Card(cardData, "#card-template");

card.getView(this);

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

// Validation  //

const validationSettings = {
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

const addCardElement = addCardModal.querySelector(".modal__form");
const editProfileElement = profileEditModal.querySelector(".modal__form");

const addCardValidator = new FormValidator(validationSettings, addCardElement);
const editProfileValidator = new FormValidator(
  validationSettings,
  editProfileElement
);

addCardValidator.enableValidation();
editProfileValidator.enableValidation();

function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keyup", handleEscape);
}

function renderCard(cardData, wrapper) {
  const cardElement = getCardElement(cardData);
  wrapper.prepend(cardElement);
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
}

function handleEscape(evt) {
  if (evt.key === "Escape") {
    const activeModal = document.querySelector(".modal_opened");
    closeModal(activeModal);
  }
}

const handleModalClose = (evt) => {
  if (
    evt.target.classList.contains("modals") ||
    evt.target.classList.contains("modal__close")
  ) {
    closeModal(evt.currentTarget);
  }
};

function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });

  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  cardDeleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  cardImage.addEventListener("click", () => {
    imageModalImgEl.src = data.link;
    imageModalImgEl.alt = data.name;
    imageModalText.textContent = data.name;
    openModal(imageModal);
  });

  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;

  return cardElement;
}

// make sure to call the handleModalClose on line 104

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
