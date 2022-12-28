import mockGetCardDeckById from './mockData/mockGetCardDeckById.json';
import mockSuggestedHashtag from './mockData/mockTagCardDecks.json';

function promiseWithTimeout(data, timeout = 1000) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(data);
    }, timeout);
  });
}

function getCardDeckById(id) {
  //fetch(`/apis/v1/cardDecks/${cardDeckId}`);
  console.log('GET:' + `/api/v1/card-decks/${id}`);
  const cardDeckData = mockGetCardDeckById?.data;
  const cardDeckItem = cardDeckData.find(({cardDeckId}) => cardDeckId === id);
  return promiseWithTimeout(cardDeckItem);
}

function getSuggestedHashtag() {
  //fetch(/apis/v1/tags)
  console.log('GET:' + '/apis/v1/tags');
  return promiseWithTimeout(mockSuggestedHashtag);
}

export default {getCardDeckById, getSuggestedHashtag};
