// @todo: Темплейт карточки
  const cardsList = document.querySelector('.places__list');

const createCards = dataCards => {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardButton = cardElement.querySelector('.card__delete-button');
  
  cardElement.querySelector('.card__image').src = dataCards.link;
  cardElement.querySelector('.card__image').alt = dataCards.name;
  cardElement.querySelector('.card__title').textContent = dataCards.name;

  cardButton.addEventListener('click', () => {
     deleteCard(cardElement);
  });

  return cardElement;
}

const deleteCard = removeCard => {
    removeCard.remove();
    return;
}

initialCards.forEach ((item) => {
 const card = createCards(item, deleteCard);
  cardsList.append(card);
})
