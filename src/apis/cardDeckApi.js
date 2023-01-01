import ApiInstance from './ApiInstance';

async function getCardDeckById(cardDeckId) {
  return ApiInstance.getRequest(`/card-decks/${cardDeckId}`);
}

export default {getCardDeckById};
