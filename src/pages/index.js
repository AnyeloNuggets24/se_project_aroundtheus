import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import "../pages/index.css";
import { validationSettings, } from "../utils/Constants.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import { api } from "../components/Api.js";

import Section from "../components/Section.js";

const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");

// Wrappers
const cardsWrap = document.querySelector(".cards__list");
const profileEditModal = document.querySelector("#profile__edit-modal");
const addCardModal = document.querySelector("#add-card-modal");
const profileEditForm = document.forms["profile-form"];
const cardForm = document.forms["add-card-form"];

//Buttons and other DOM nodes
const profileEditButton = document.querySelector(".profile__edit-button");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const addNewCardButton = document.querySelector(".profile__add-button");

// Form Data

const userInfo = new UserInfo({
  profileName: ".profile__title",
  profileJob: ".profile__description",
});

const nameInput = profileEditForm.querySelector(".modal__input_type_name");
const jobInput = profileEditForm.querySelector(
  ".modal__input_type_description"
);
const cardTitleInput = cardForm.querySelector(".modal__input_type_title");

const cardUrlInput = cardForm.querySelector(".modal__input_type_url");

const imageModal = document.querySelector("#image-modal");
const imageModalImgEl = imageModal.querySelector(".modal__image");
const imageModalText = document.querySelector(".modal__text");

const addCardValidator = new FormValidator(validationSettings, cardForm);
const editProfileValidator = new FormValidator(
  validationSettings,
  profileEditForm
);

addCardValidator.enableValidation();
editProfileValidator.enableValidation();

function renderCard(cardData, wrapper) {
  const cardElement = new Card(
    { data: cardData, handleImageClick: handleImageClick },
    "#card-template"
  );
  wrapper.prepend(cardElement.getView());
}

const profileEditPopup = new PopupWithForm({
  popupSelector: "#profile__edit-modal",
  handleFormSubmit: (data) => {
    userInfo.setUserInfo({
      name: data.name,
      job: data.description,
    });
  },
});

profileEditPopup.setEventListeners();

// function handleProfileFormSubmit(evt) {
//   evt.preventDefault();
//   profileTitle.textContent = nameInput.value;
//   profileDescription.textContent = jobInput.value;
//   profileEditModal.close();
// }

const imageModalImPopup = new PopupWithImage("#image-modal");
imageModalImPopup.setEventListeners();

let selectedCardId = null;

const confirmDeleteCard = new PopupWithForm({
  popupSelector: "#delete-card-modal",
  handleFormSubmit: () => {
    api.deleteCard(selectedCardId).then((r) => console.log("dleteed", r));
  },
});
confirmDeleteCard.setEventListeners();

const createCard = (data) => {
  const card = new Card(
    {
      data,
      handleImageClick: () => {
        imageModalImPopup.open(data);
      },
      handleDelete: () => {
        selectedCardId = data._id;
        confirmDeleteCard.open();
        confirmDeleteCard.afterSubmit(() => card.remove())
      },
    },
    "#card-template"
  );
  return card.getView();
};

const cardList = new Section(
  {
    renderer: (data) => {
      cardList.addItem(createCard(data));
    },
  },
  ".cards__list"
);

api
  .getInitialCards()
  .then((data) => {
    console.log("Got initial set of cards!");
    cardList.renderItems(data);
  })
  .catch((err) => {
    console.error(err);
  });

function handleImageClick(data) {
  imageModalImgEl.src = data.link;
  imageModalImgEl.alt = data.name;
  imageModalText.textContent = data.name;
  imageModal.open();
}

// form listener

profileEditButton.addEventListener("click", () => {
  const currentUserInfo = userInfo.getUserInfo();
  nameInput.value = currentUserInfo.name;
  jobInput.value = currentUserInfo.job;
  profileEditPopup.open();
});
//add new card button

addNewCardButton.addEventListener("click", () => {
  newCardPopup.open();
});

// initialCards.forEach((cardData) => renderCard(cardData, cardsWrap));

fetch("https://around-api.en.tripleten-services.com/v1/cards", {
  headers: {
    authorization: "a3ba7fe6-d8d6-4fc9-a80b-33e779685270",
  },
}).then((res) => res.json());

api
  .getUserInfo()
  .then((userData) => {
    console.log("User Info:", userData);
  })
  .catch((err) => {
    console.error(err);
  });

const newCardPopup = new PopupWithForm({
  popupSelector: "#add-card-modal",
  handleFormSubmit: (data) => {
    api
      .addCard({
        name: data.title,
        link: data.url,
      })
      .then((res) => {
        cardList.addItem(createCard(res));
        cardForm.reset();
        addCardValidator.resetValidation();
      });
  },
});

newCardPopup.setEventListeners();
