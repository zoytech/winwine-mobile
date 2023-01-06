import {useDispatch} from 'react-redux';
import {StyleSheet, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Typography} from 'src/themes';
import {FilledButton, StandardIconToggle} from 'src/components';
import {KEY, LIMIT_NUMBER} from 'src/constants';
import {addLibraryKeyStore, removeLibraryKeyStore} from 'src/redux/slices';
import {remove, replace, select} from 'src/utils';
import {useState} from 'react';

export default function HeaderButtons(props) {
  const {
    data,
    hasStoreKey,
    renderRightComponents,
    children,
    style,
    onFilledButtonPress = () => {},
    ...otherProps
  } = props;

  const dispatch = useDispatch();
  const [isSaved, setIsSaved] = useState(hasStoreKey);
  const cardDeckIdParam = data?.cardDeckId;
  const containerStyle = [styles.container, style];

  async function handleDownloadDeckPress() {
    if (isSaved) {
      await removeItemFromStorage(cardDeckIdParam);
      setIsSaved(false);
    } else {
      await saveItemToStorage(cardDeckIdParam, data);
      setIsSaved(true);
    }
  }

  async function removeItemFromStorage(key) {
    console.log(key);

    const keyStore = `${KEY?.SAVE_LIB}/${key}`;
    try {
      await AsyncStorage.removeItem(keyStore);
      console.log(keyStore);
      await dispatchAndRemoveStoreKey(keyStore, KEY?.SAVE_LIB);
    } catch (e) {
      console.log('fail remove in save lib: ', e);
    }
  }

  async function saveItemToStorage(key, dt) {
    const keyStore = `${KEY?.SAVE_LIB}/${key}`;
    const jsonValue = JSON.stringify(dt);
    await AsyncStorage.setItem(keyStore, jsonValue);
    await dispatchAndSaveStoreKey(
      keyStore,
      KEY.SAVE_LIB,
      LIMIT_NUMBER.LIB_CARD_DECKS,
    );
  }

  async function dispatchAndRemoveStoreKey(storageKey, mainKey) {
    dispatch(removeLibraryKeyStore(storageKey));
    const getMainKeyRqs = await AsyncStorage.getItem(mainKey);
    const storeKeys = !getMainKeyRqs ? [] : JSON.parse(getMainKeyRqs);
    remove.elementAtMiddle(storeKeys, storageKey);
    await AsyncStorage.setItem(mainKey, JSON.stringify(storeKeys));
  }

  async function dispatchAndSaveStoreKey(storageKey, mainKey, limitItem) {
    dispatch(addLibraryKeyStore(storageKey));
    const getMainKeyRqs = await AsyncStorage.getItem(mainKey);
    const storeKeys = !getMainKeyRqs ? [] : JSON.parse(getMainKeyRqs);
    storeKeys.unshift(storageKey);
    const uniqueStoreKeys = select.uniqueElement(storeKeys);
    replace.lastElementWhenExceedLength(uniqueStoreKeys, limitItem);
    await AsyncStorage.setItem(mainKey, JSON.stringify(uniqueStoreKeys));
  }

  function renderHeaderLeftButtons() {
    const downloadProps = {
      name: 'downcircleo',
      selectedName: 'downcircle',
      style: styles.icon,
      iconStyle: {size: 30},
    };
    return (
      <StandardIconToggle
        {...downloadProps}
        onPress={handleDownloadDeckPress}
        isSelected={hasStoreKey}
      />
    );
  }

  function renderHeaderRightButton() {
    return (
      <FilledButton
        content={'Chơi ngay'}
        contentStyle={styles.buttonContent}
        onPress={onFilledButtonPress}
      />
    );
  }

  return (
    <View {...otherProps} style={containerStyle}>
      {children}
      <View style={styles.subAction}>{renderHeaderLeftButtons()}</View>
      <View style={styles.mainAction}>{renderHeaderRightButton()}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    aspectRatio: 7,
    flexDirection: 'row',
    paddingHorizontal: 8,
  },
  mainAction: {
    width: '50%',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  subAction: {
    width: '50%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  buttonContent: {
    ...Typography.title.medium,
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  icon: {
    minWidth: 50,
    minHeight: 50,
    width: 50,
    aspectRatio: 1,
    borderRadius: 50 / 2,
  },
});
