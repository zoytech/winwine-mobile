import ApiInstance from './ApiInstance';

function getCardDeckById(cardDeckId) {
  return ApiInstance.getRequest(`/card-decks/${cardDeckId}`);
}

function getCardDecks() {
  return ApiInstance.getRequest('/card-decks');
}

function postCardDeck(config) {
  return ApiInstance.postRequest('/card-decks', config);
}

export default {getCardDeckById, getCardDecks, postCardDeck};
