import ApiInstance from './ApiInstance';

function getCardsByCardDeckId(cardDeckId) {
  return ApiInstance.getRequest(`/card-decks/${cardDeckId}/cards`);
}

export default {getCardsByCardDeckId};
