// @todo: Темплейт карточки
import '../pages/index.css';
import {initialCards, createCards, deleteCard} from './cards.js';
import {openModal, closeModal, setPopupListeners} from './modal.js'
import avatar from '../images/avatar.jpg';

document.querySelector('.profile__image').style.backgroundImage = `url(${avatar})`;
  
const cardsList = document.querySelector('.places__list');
const editProfilePopup = document.querySelector('.popup_type_edit');
const addCardPopup = document.querySelector('.popup_type_new-card');
const editProfileButton = document.querySelector('.profile__edit-button');
const addProfileButton = document.querySelector('.profile__add-button');
const imagePopup = document.querySelector('.popup_type_image');
const imagePopupElement = imagePopup.querySelector ('.popup__image');
const imagepopupCaption = imagePopup.querySelector ('.popup__caption');
const formElement = document.querySelector('.popup__form[name="edit-profile"]');
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_description');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');
const cardFromElement = document.querySelector('.popup__form[name="new-place"]');
const titleInput = cardFromElement.querySelector('.popup__input_type_card-name')
const linkInput = cardFromElement.querySelector('.popup__input_type_url');


addProfileButton.addEventListener('click', () => {
  openModal(addCardPopup);
  setPopupListeners(addCardPopup );
})

initialCards.forEach ((item) => {
  const card = createCards(item, deleteCard);
  cardsList.append(card);
})

editProfileButton.addEventListener ('click', () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openModal(editProfilePopup);
  setPopupListeners(editProfilePopup);
})

function handleFormSubmit(evt) {
  evt.preventDefault(); 
  
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  closeModal(editProfilePopup);
}

formElement.addEventListener('submit', handleFormSubmit);

function addUserCards (evt) {
  evt.preventDefault(); 

  const newCards = [];
  const link = linkInput.value;
  const alt = titleInput.value;
  const name = titleInput.value;
 
 
  newCards.push({link, alt, name});

  newCards.forEach ((item) => {
    const newCard = createCards(item, deleteCard);
    cardsList.prepend(newCard);
  })
  
  cardFromElement.reset();
  closeModal(addCardPopup);
}

cardFromElement.addEventListener('submit', addUserCards);

export function openImagePopup (image, caption) {
  imagePopupElement.src = image;
  imagePopupElement.alt = caption;
  imagepopupCaption.textContent = caption;
  openModal(imagePopup);
  setPopupListeners(imagePopup);
}















