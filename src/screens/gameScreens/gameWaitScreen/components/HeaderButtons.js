import {useDispatch, useSelector} from 'react-redux';
import {StyleSheet, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Typography} from 'src/themes';
import {FilledButton, StandardIconToggle} from 'src/components';
import {KEY} from 'src/constants';
import {addLibraryKeyStore, removeLibraryKeyStore} from 'src/redux/actions';
import {libraryKeyStoreSelector} from '../../../../redux/selectors';

export default function HeaderButtons(props) {
  const {
    data,
    renderRightComponents,
    children,
    style,
    onFilledButtonPress = () => {},
    ...otherProps
  } = props;
  const dispatch = useDispatch();
  const libraryKeyStores = useSelector(libraryKeyStoreSelector);
  const cardDeckIdParam = data?.cardDeckId;
  const containerStyle = [styles.container, style];

  const defaultKeyStore = `${KEY?.SAVE_LIB}/${cardDeckIdParam}`;
  const hasSaveId = libraryKeyStores.includes(defaultKeyStore);

  async function removeItemFromStorage(key) {
    const keyStore = `${KEY?.SAVE_LIB}/${key}`;
    try {
      await AsyncStorage.removeItem(keyStore);
      dispatch(removeLibraryKeyStore(keyStore));
    } catch (e) {
      console.log('fail remove in save lib: ', e);
    }
  }

  async function saveItemToStorage(key, dt) {
    const keyStore = `${KEY?.SAVE_LIB}/${key}`;
    try {
      const jsonValue = JSON.stringify(dt);
      await AsyncStorage.setItem(keyStore, jsonValue);
      dispatch(addLibraryKeyStore(keyStore));
    } catch (e) {
      console.log('fail store in save lib: ', e);
    }
  }

  async function handleDownloadDeckPress() {
    if (hasSaveId) {
      await removeItemFromStorage(cardDeckIdParam);
    } else {
      await saveItemToStorage(cardDeckIdParam, data);
    }
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
        isSelected={hasSaveId}
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
