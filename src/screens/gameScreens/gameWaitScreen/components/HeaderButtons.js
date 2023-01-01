import {useDispatch, useSelector} from 'react-redux';
import {StyleSheet, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Typography} from 'src/themes';
import {FilledButton, StandardIconToggle} from 'src/components';
import {KEY} from 'src/constants';
import {useEffect, useState} from 'react';
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
  const [isSaved, setIsSaved] = useState(false);
  const cardDeckIdParam = data?.cardDeckId;
  const containerStyle = [styles.container, style];

  async function removeItemFromStorage(key) {
    try {
      await AsyncStorage.removeItem(key);
      console.log('success remove save lib');
      dispatch(removeLibraryKeyStore(key));
    } catch (e) {
      console.log('fail remove in save lib: ', e);
    }
  }

  async function saveItemToStorage(key) {
    try {
      const jsonValue = JSON.stringify(data);
      await AsyncStorage.setItem(key, jsonValue);
      console.log('success store save lib');
      dispatch(addLibraryKeyStore(key));
    } catch (e) {
      console.log('fail store in save lib: ', e);
    }
  }

  async function handleDownloadDeckPress() {
    const keyStore = `${KEY?.SAVE_LIB}/${cardDeckIdParam}`;
    if (isSaved) {
      await removeItemFromStorage(keyStore);
      setIsSaved(false);
    } else {
      await saveItemToStorage(keyStore);
      setIsSaved(true);
    }
  }

  function renderHeaderLeftButtons() {
    const downloadProps = {
      name: 'downcircleo',
      selectedName: 'downcircle',
      style: styles.icon,
    };
    return (
      <StandardIconToggle
        {...downloadProps}
        onPress={handleDownloadDeckPress}
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
    minWidth: 30,
    minHeight: 30,
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
  },
});
