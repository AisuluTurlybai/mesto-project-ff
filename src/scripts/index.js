// @todo: Темплейт карточки
import '../pages/index.css';
import {createCard, handleLikeClick, deleteCard} from './card.js';
import {openModal, closeModal, setPopupListeners} from './modal.js'
import { enableValidation, clearValidation } from './validation.js';
import {getUserInfo, getInitialCards, updateUserInfo, postNewCards, deleteCardById, likeCard, dislikeCard, updateUserAvatar} from './api.js'
  
const cardsList = document.querySelector('.places__list');
const editProfilePopup = document.querySelector('.popup_type_edit');
const addCardPopup = document.querySelector('.popup_type_new-card');
const editProfileButton = document.querySelector('.profile__edit-button');
const addProfileButton = document.querySelector('.profile__add-button');
const imagePopup = document.querySelector('.popup_type_image');
const imagePopupElement = imagePopup.querySelector ('.popup__image');
const imagePopupCaption = imagePopup.querySelector ('.popup__caption');
const editProfileForm = document.querySelector('.popup__form[name="edit-profile"]');
const editProfileNameInput = editProfileForm.querySelector('.popup__input_type_name');
const editProfileJobInput = editProfileForm.querySelector('.popup__input_type_description');
const profileNameText = document.querySelector('.profile__title');
const profileInfo = document.querySelector('.profile__info');
const profileJobElement = document.querySelector('.profile__description');
const profileAvatar = document.querySelector('.profile__image');
const formNewCard = document.querySelector('.popup__form[name="new-place"]');
const inputNameFormNewCard = formNewCard.querySelector('.popup__input_type_card-name')
const inputLinkFormNewCard = formNewCard.querySelector('.popup__input_type_url');
const profileForm = document.querySelector('.popup_type_edit .popup__form');
const updateProfileAvatarUrlPopup = document.querySelector('.popup_type-avatar');
const updateProfileAvatarUrlForm = document.querySelector('.popup__form[name="update-avatar"]')
const inputFormUpdateAvatarUrl = updateProfileAvatarUrlForm.querySelector('.popup__input_type_url')
const removeConfirmPopup = document.querySelector('.popup_type-remove');
const removeConfirmationButton = removeConfirmPopup.querySelector('.popup__card-remove');

let cardToDelete = null;
let deleteButton = null;
  
function removeConfirmation(cardElement, deleteCardButton) {
  cardToDelete = cardElement;
  deleteButton = deleteCardButton;
  openModal(removeConfirmPopup);
}

removeConfirmationButton.addEventListener('click', () => {
  if (cardToDelete && deleteButton) {
    deleteCard(cardToDelete);
    deleteCardById(deleteButton.id);
    closeModal(removeConfirmPopup);
  }
})

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

enableValidation(validationConfig);

function openImagePopup (cardData) {
  imagePopupElement.src = cardData.link;
  imagePopupElement.alt = cardData.name;
  imagePopupCaption.textContent = cardData.name;

  openModal(imagePopup);
}

setPopupListeners(removeConfirmPopup);
setPopupListeners(addCardPopup );
setPopupListeners(editProfilePopup);
setPopupListeners(imagePopup);
setPopupListeners(updateProfileAvatarUrlPopup);

addProfileButton.addEventListener('click', () => {
  openModal(addCardPopup);
})

editProfileButton.addEventListener ('click', () => {
  editProfileNameInput.value = profileNameText.textContent;
  editProfileJobInput.value = profileJobElement.textContent;
  clearValidation(profileForm, validationConfig);
  
  openModal(editProfilePopup);
})

function handleFormSubmit(evt) {
  evt.preventDefault();
  
  const submitButton = evt.submitter || editProfileForm.querySelector('.popup__button');
  renderLoading(true, submitButton);

  updateUserInfo(editProfileNameInput.value, editProfileJobInput.value)
    .then(data => {
      profileNameText.textContent = data.name;
      profileJobElement.textContent = data.about;
      closeModal(editProfilePopup);
    })
    .catch(err => {
      console.error('Ошибка обновления:', err);
    })
    .finally (() => {
    renderLoading(false, submitButton)
  })
}

editProfileForm.addEventListener('submit', handleFormSubmit);

function addUserCards (evt) {
  evt.preventDefault(); 
  
    const submitButton = evt.submitter || formNewCard.querySelector('.popup__button');

  renderLoading(true, submitButton);

  const name = inputNameFormNewCard.value;
  const link = inputLinkFormNewCard.value;

  postNewCards(name, link)
    .then((data) => {
      const cardElement = createCard(data, handleLikeClick, openImagePopup, likeCard, dislikeCard, removeConfirmation);
      cardsList.prepend(cardElement);
      formNewCard.reset();
      closeModal(addCardPopup);
    })
    .catch(err => {
      console.error('Ошибка обновления:', err);
    })
    .finally (() => {
    renderLoading(false, submitButton)
  })
}

formNewCard.addEventListener('submit', addUserCards );

Promise.all([getUserInfo(), getInitialCards()])
.then(([userData, cards]) => {
  setUserInfo(userData)
  setCards(cards)
})

function setCards(cards) {
  cards.forEach ((item) => {
    const card = createCard(item, handleLikeClick, openImagePopup, likeCard, dislikeCard, removeConfirmation);
    cardsList.append(card);
  })
}
function setUserInfo(userData) {
  profileInfo.id = userData._id;
  profileNameText.textContent = userData.name;
  profileJobElement.textContent = userData.about;
  profileAvatar.style.backgroundImage = `url(${userData.avatar})`;
}

profileAvatar.addEventListener ('click', () => {
openModal(updateProfileAvatarUrlPopup);
})

function updateProfileAvatarUrl (evt) {
  evt.preventDefault(); 
  
  const submitButton = evt.submitter || updateProfileAvatarUrlForm.querySelector('.popup__button');

  renderLoading(true, submitButton);

  const avatarUrl = inputFormUpdateAvatarUrl.value;
  updateUserAvatar(avatarUrl)
    .then(data => {
      profileAvatar.style.backgroundImage = `url(${data.avatar})`;
      closeModal(updateProfileAvatarUrlPopup);
    })
    .catch(err => {
      console.error('Ошибка обновления:', err);
    })
     .finally (() => {
    renderLoading(false, submitButton)
  })
}
updateProfileAvatarUrlForm.addEventListener('submit', updateProfileAvatarUrl)

function renderLoading (isLoading, buttonText) {
  if (isLoading) {
    buttonText.textContent = 'Сохранение...'
  } else {
    buttonText.textContent = 'Сохранить'
  }
}

