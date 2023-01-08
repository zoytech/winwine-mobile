import {useDispatch} from 'react-redux';
import {StyleSheet, View} from 'react-native';
import {Typography} from 'src/themes';
import {FilledButton, StandardIconToggle} from 'src/components';
import {KEY, LIMIT} from 'src/constants';
import {addLibraryKeyStore, removeLibraryKeyStore} from 'src/redux/slices';
import {
  removeItemFromStorage,
  removeKeyStoresFromStorage,
  saveItemToStorage,
  saveKeyStoresToStorage,
} from 'src/utils';
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
    const keyStore = `${KEY.SAVE_LIB}/${cardDeckIdParam}`;
    if (isSaved) {
      console.log('hasStoreKey: ', hasStoreKey);
      await removeItemFromStorage(cardDeckIdParam, KEY.SAVE_LIB);
      dispatch(removeLibraryKeyStore(keyStore));
      await removeKeyStoresFromStorage(cardDeckIdParam, KEY.SAVE_LIB);
      setIsSaved(false);
    } else {
      await saveItemToStorage(cardDeckIdParam, KEY.SAVE_LIB, data);
      dispatch(addLibraryKeyStore(keyStore));
      await saveKeyStoresToStorage(
        cardDeckIdParam,
        KEY.SAVE_LIB,
        LIMIT.LIB_CARD_DECKS,
      );
      setIsSaved(true);
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
