import ApiInstance from './ApiInstance';

function getCardDeckById(cardDeckId) {
  return ApiInstance.getRequest(`/card-decks/${cardDeckId}`);
}

function getCardDecks() {
  console.log('test');
  return ApiInstance.getRequest('/card-decks');
}

export default {getCardDeckById, getCardDecks};
