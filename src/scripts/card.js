const cardTemplate = document.querySelector('#card-template').content;

export const createCard = (cardData, onLikeCard, onOpenImagePopup, likeCard, dislikeCard, removeConfirmation, userId) => { 
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const deleteCardButton = cardElement.querySelector('.card__delete-button');
  const cardImage = cardElement.querySelector('.card__image');
  const likeButton = cardElement.querySelector('.card__like-button');
  const likeCount = cardElement.querySelector('.like__count');
  
  likeButton.id = cardData._id;
  deleteCardButton.id = cardData._id
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardElement.querySelector('.card__title').textContent = cardData.name;
 

  if (isMyCard(cardData, userId)) {
    deleteCardButton.addEventListener('click', () => removeConfirmation(cardElement, deleteCardButton.id));
  } else {
    deleteCardButton.style.display = 'none';
  }
  
  likeButton.addEventListener('click', () => onLikeCard(likeButton, likeCount, likeCard, dislikeCard));
  cardImage.addEventListener('click', () => {    
      onOpenImagePopup(cardData); 
  });
  likeCount.textContent = cardData.likes.length;
  if (isThisCardLiked(cardData, userId)) {
    likeButton.classList.toggle('card__like-button_is-active');
  }

  return cardElement;
}

export const handleLikeClick = (likeElement,likeCount, likeCard, dislikeCard) => {
  const isLiked = likeElement.classList.toggle('card__like-button_is-active');
  if(isLiked) {
    likeCard(likeElement.id)
      .then (data => {
        likeCount.textContent = data.likes.length
      })
      .catch(err => {
        console.error('Ошибка обновления:', err);
      })
  } else {
    dislikeCard(likeElement.id)
    .then (data =>{
      likeCount.textContent = data.likes.length
    })
    .catch(err => {
      console.error('Ошибка обновления:', err);
    })
  }
}

export const deleteCard = removeCard => {
    removeCard.remove();
    return;
}

function isThisCardLiked(card, userId) {
  return card.likes.some((element) => element._id === userId);
}

function isMyCard(card, userId) {
  return card.owner._id === userId;
}