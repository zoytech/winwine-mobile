import AsyncStorage from '@react-native-async-storage/async-storage';
import {replace, select} from '../arrayMethods';

async function isItemInStorage(id, mainKey, reduxKeys) {
  const defaultKeyStore = `${mainKey}/${id}`;
  const getMainKeyRqs = await AsyncStorage.getItem(mainKey);
  const mainKeyRqs = !getMainKeyRqs ? [] : JSON.parse(getMainKeyRqs);
  const currentStoreKeys =
    reduxKeys.length !== 0 ? reduxKeys.concat(mainKeyRqs) : mainKeyRqs;
  return currentStoreKeys.includes(defaultKeyStore);
}

async function getStoreKeysFromStorage(mainKey, reduxKeys, limit) {
  const getMainKeyRqs = await AsyncStorage.getItem(mainKey);
  const mainKeyRqs = !getMainKeyRqs ? [] : JSON.parse(getMainKeyRqs);
  const currentStoreKeys =
    reduxKeys.length !== 0 ? reduxKeys.concat(mainKeyRqs) : mainKeyRqs;
  const uniqueStoreKeys = select.uniqueElement(currentStoreKeys);
  return replace.lastElementWhenExceedLength(uniqueStoreKeys, limit);
}

async function getDataFromStorage(mainKey) {
  const dataRqs = mainKey && (await AsyncStorage.multiGet(mainKey));
  const retrievedData = [];
  dataRqs.forEach(item => {
    const [, value] = item || {};
    value && retrievedData.push(JSON.parse(value));
  });
  return retrievedData;
}

async function saveItemToStorage(id, mainKey, dt) {
  const keyStore = `${mainKey}/${id}`;
  const jsonValue = JSON.stringify(dt);
  await AsyncStorage.setItem(keyStore, jsonValue);
}

async function saveKeyStoresToStorage(id, mainKey, limitItem) {
  const keyStore = `${mainKey}/${id}`;
  const getMainKeyRqs = await AsyncStorage.getItem(mainKey);
  const storeKeys = !getMainKeyRqs ? [] : JSON.parse(getMainKeyRqs);
  storeKeys.unshift(keyStore);
  const uniqueStoreKeys = select.uniqueElement(storeKeys);
  replace.lastElementWhenExceedLength(uniqueStoreKeys, limitItem);
  await AsyncStorage.setItem(mainKey, JSON.stringify(uniqueStoreKeys));
}

export {
  isItemInStorage,
  getStoreKeysFromStorage,
  getDataFromStorage,
  saveItemToStorage,
  saveKeyStoresToStorage,
};
