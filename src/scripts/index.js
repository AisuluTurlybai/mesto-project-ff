// @todo: Темплейт карточки
import '../pages/index.css';
import {createCard, handleLikeClick, deleteCard} from './card.js';
import {openModal, closeModal, setPopupListeners} from './modal.js'
import {initialCards} from './cards.js'
import avatar from '../images/avatar.jpg';

document.querySelector('.profile__image').style.backgroundImage = `url(${avatar})`;
  
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
const profileJobElement = document.querySelector('.profile__description');
const formNewCard = document.querySelector('.popup__form[name="new-place"]');
const inputNameFormNewCard = formNewCard.querySelector('.popup__input_type_card-name')
const inputLinkFormNewCard = formNewCard.querySelector('.popup__input_type_url');

function openImagePopup (cardData) {
  imagePopupElement.src = cardData.link;
  imagePopupElement.alt = cardData.name;
  imagePopupCaption.textContent = cardData.name;

  openModal(imagePopup);
}

initialCards.forEach ((item) => {
  const card = createCard(item, deleteCard, handleLikeClick, openImagePopup);
  cardsList.append(card);
})

setPopupListeners(addCardPopup );
setPopupListeners(editProfilePopup);
setPopupListeners(imagePopup);

addProfileButton.addEventListener('click', () => {
  openModal(addCardPopup);
})

editProfileButton.addEventListener ('click', () => {
  editProfileNameInput.value = profileNameText.textContent;
  editProfileJobInput.value = profileJobElement.textContent;
  openModal(editProfilePopup);
})

function handleFormSubmit(evt) {
  evt.preventDefault(); 
  
  profileNameText.textContent = editProfileNameInput.value;
  profileJobElement.textContent = editProfileJobInput.value;

  closeModal(editProfilePopup);
}

editProfileForm.addEventListener('submit', handleFormSubmit);

function addUserCards (evt) {
  evt.preventDefault(); 

  const newCard = {};
  newCard.link = inputLinkFormNewCard.value;
  newCard.alt = inputNameFormNewCard.value;
  newCard.name = inputNameFormNewCard.value;
  console.log(newCard);

  const newCardElement = createCard(newCard, deleteCard, handleLikeClick, openImagePopup);
  cardsList.prepend(newCardElement);
  
  formNewCard.reset();
  closeModal(addCardPopup);
}

formNewCard.addEventListener('submit', addUserCards);