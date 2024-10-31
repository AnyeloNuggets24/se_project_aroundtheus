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

const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");

// Wrappers
const cardsWrap = document.querySelector(".cards__list");
const profileEditModal = document.querySelector("#profile__edit-modal");
const addCardModal = document.querySelector("#add-card-modal");
const profileEditForm = profileEditModal.querySelector(".modal__form");

//Buttons and other DOM nodes
const profileEditButton = document.querySelector(".profile__edit-button");
const profileCloseButton = profileEditModal.querySelector(".modal__close");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileSubmitButton = profileEditForm.querySelector(".modal__button");
const addNewCardButton = document.querySelector(".profile__add-button");

// Form Data
const nameInput = profileEditForm.querySelector(".modal__input_type_title");
const jobInput = profileEditForm.querySelector(
  ".modal__input_type_description"
);

const closeModal = (modal) => {
  modal.classList.remove("modal_opened");
};

// const openModal = (modal) => {
// profileEditModal.classList.add("modal_opened");
// };

const openModal = (modal) => {
  profileEditModal.classList.add("modal_opened");
};

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeModal();
}

function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");

  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;

  return cardElement;
}

profileEditButton.addEventListener("click", () => openModal(profileEditModal));
profileCloseButton.addEventListener("click", () =>
  closeModal(profileEditModal)
);
profileSubmitButton.addEventListener("submit", () => handleProfileFormSubmit);

//add new card button

addNewCardButton.addEventListener("click", () => openModal(addCardModal));

initialCards.forEach((cardData) => {
  cardsWrap.append(getCardElement(cardData));
});
