// @todo: Темплейт карточки
  const cardsList = document.querySelector('.places__list');

function addCards (dataCards) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardButton = cardElement.querySelector('.card__delete-button');
  
  cardElement.querySelector('.card__image').src = dataCards.link;
  cardElement.querySelector('.card__title').textContent = dataCards.name;

  cardButton.addEventListener('click', function () {
     deleteCard(cardElement);
  });

  return cardElement;
}

function deleteCard (removeCard) {
    removeCard.remove();
    return;
}

initialCards.forEach (function(item) {
 const card = addCards(item, deleteCard);
  cardsList.append(card);
})
