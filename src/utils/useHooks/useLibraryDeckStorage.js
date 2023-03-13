import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {api, KEY} from '../../constants';
import {libraryKeyStoreSelector} from '../../redux/selectors';
import {addLibraryKeyStore, removeLibraryKeyStore} from '../../redux/actions';

export default function useLibraryDeckStorage(data) {
  const dispatch = useDispatch();
  const keyStoreArr = useSelector(libraryKeyStoreSelector);

  const keyStore = `${KEY?.SAVE_LIB}/${data?.cardDeckId}`;

  //TODO:fetch api if cannot catch parallel

  async function getCardDeckApiById(url = '', data = {}) {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.json();
  }

  async function fetchCardDeckApi(id) {
    try {
      await getCardDeckApiById(
        `${api?.HOST}/${api?.PATH}/card-decks/${id}`,
      ).then(data => {
        setCardDeck(data?.data);
      });
    } catch (e) {
      console.log('fetchCardDeckApi error: ', e);
    }
  }

  async function getMultipleCardDeck(keyStores) {
    const data = await AsyncStorage.multiGet(keyStores);
    data.map(item => {
      const [key, value] = item || {};
      return value != null ? JSON.parse(value) : null;
    });
    console.log('getMulti card deck success');
  }

  async function saveCardDeck(key) {
    try {
      const jsonValue = JSON.stringify(cardDeck);
      await AsyncStorage.setItem(key, jsonValue);
      dispatch(addLibraryKeyStore);
    } catch (e) {
      console.log('save card deck error: ', e);
    } finally {
      await getMultipleCardDeck();
    }
  }

  async function removeCardDeck(key) {
    try {
      await AsyncStorage.removeItem(key);
      dispatch(removeLibraryKeyStore);
      console.log('remove card deck success');
    } catch (e) {
      console.log('remove card deck error: ', e);
    }
  }

  return {saveCardDeck, removeCardDeck};
}
