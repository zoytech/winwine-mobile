import ApiInstance from './ApiInstance';

async function getCardsByCardDeckId(cardDeckId) {
  return ApiInstance.getRequest(`/card-decks/${cardDeckId}/cards`);
}

export default {getCardsByCardDeckId};
