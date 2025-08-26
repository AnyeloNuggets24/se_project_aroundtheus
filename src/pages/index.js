import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import "../pages/index.css";
import { validationSettings } from "../utils/Constants.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";

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
  profileAvatar: ".profile__image",
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

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "a3ba7fe6-d8d6-4fc9-a80b-33e779685270",
    "Content-Type": "application/json",
  },
});

addCardValidator.enableValidation();
editProfileValidator.enableValidation();

const profileEditPopup = new PopupWithForm({
  popupSelector: "#profile__edit-modal",
  handleFormSubmit: (data) => {
    return api
      .setUserInfo({
        name: data.name,
        about: data.description, // use "job" because that’s your input name
      })
      .then((res) => {
        userInfo.setUserInfo({
          name: res.name,
          job: res.about, // match your UserInfo fields
        });
      })
      .catch((err) => {
        console.error("Failed to load Profile:", err);
      });
  },
});

profileEditPopup.setEventListeners();

let userId = null;

let imageModalImPopup = new PopupWithImage("#image-modal");
imageModalImPopup.setEventListeners();

let selectedCardId = null;

const confirmDeleteCard = new PopupWithForm({
  popupSelector: "#delete-card-modal",
  handleFormSubmit: () => {
    return api
      .deleteCard(selectedCardId)
      .then((res) => {
        console.log("Deleted card:", res);
      })
      .catch((err) => {
        console.error("Failed to delete card:", err);
      });
  },
});

confirmDeleteCard.setEventListeners();

// createCards //

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
        confirmDeleteCard.afterSubmit(() => card.remove());
      },
      handleLikeClick,
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

const handleLikeClick = (cardId, isLiked, cardInstance) => {
  const likeAction = isLiked ? api.unlikeCard(cardId) : api.likeCard(cardId);

  likeAction
    .then((res) => {
      cardInstance.updateLikes(res.likes); // updated likes
    })
    .catch((err) => {
      console.error("Failed to update like:", err);
    });
};

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

//  Avatar profile popup  8/16/2025 //

const avatarButton = document.querySelector("#profile__avatar-button");

const avatarPopup = new PopupWithForm({
  popupSelector: "#update-avatar-modal",
  handleFormSubmit: (data) => {
    return api
      .updateAvatar({ avatar: data.avatar })
      .then((res) => {
        userInfo.setUserInfo({ avatar: res.avatar });
      })
      .catch((err) => {
        console.error("Failed to update avatar:", err);
      });
  },
});
avatarPopup.setEventListeners();

const avatarForm = document.forms["update-avatar-form"];

const avatarValidator = new FormValidator(validationSettings, avatarForm);
avatarValidator.enableValidation();

// open popup when avatar button is clicked
avatarButton.addEventListener("click", () => {
  avatarPopup.open();
});

const newCardPopup = new PopupWithForm({
  popupSelector: "#add-card-modal",
  handleFormSubmit: (data) => {
    return api
      .addCard({
        //  return the promise
        name: data.title,
        link: data.url,
      })
      .then((res) => {
        cardList.addItem(createCard(res));
        cardForm.reset();
        addCardValidator.resetValidation();
      })
      .catch((err) => {
        console.error("Failed to add card:", err);
      });
  },
});

newCardPopup.setEventListeners();

api
  .getAppInfo()
  .then(([cardsArray, userData]) => {
    userId = userData._id;

    userInfo.setUserInfo(userData);
    cardList.renderItems(cardsArray.reverse());
  })
  .catch((err) => console.log("Faild to fetch initial app data:", err));
