const cardTemplate = document.querySelector('#card-template').content;

export const createCard = (cardData, onDeleteCard, onLikeCard, onOpenImagePopup) => { 
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const deleteCardButton = cardElement.querySelector('.card__delete-button');
  const cardImage = cardElement.querySelector('.card__image');
  const likeButton = cardElement.querySelector('.card__like-button');
  
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardElement.querySelector('.card__title').textContent = cardData.name;
 
  deleteCardButton.addEventListener('click', () => onDeleteCard(cardElement));  
  likeButton.addEventListener('click', () => onLikeCard(likeButton));
  cardImage.addEventListener('click', () => {    
      onOpenImagePopup(cardData); 
  });

  return cardElement;
}

export const handleLikeClick = likeElement => {
  likeElement.classList.toggle('card__like-button_is-active');
}

export const deleteCard = removeCard => {
    removeCard.remove();
    return;
}