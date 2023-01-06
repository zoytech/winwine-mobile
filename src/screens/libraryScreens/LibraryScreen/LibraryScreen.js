import React, {useEffect, useRef, useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Color, ColorVariant} from 'src/themes';
import {libraryKeyStoreSelect} from 'src/redux/slices';
import {CustomStatusBar, EmptyInfoAnnouncement} from 'src/screens/components';
import {LibraryCardDecks, LibraryTopAppBar} from './components';
import {KEY, renderLimit} from '../../../constants';
import {replace, select} from '../../../utils';
import {FilledButton, SpinnerType1} from '../../../components';

export default function LibraryScreen({navigation}) {
  const topBarRef = useRef({
    onScroll: () => {},
  });
  const [selectedChip, setSelectedChip] = useState(null);
  const [libraryCardDeck, setLibraryCardDeck] = useState(null); //empty data that get from starage
  const [mainKeys, setMainKeys] = useState([]); //empty storage
  const [hasStoreKey, setHasStoreKey] = useState(null);

  const keyStores = useSelector(libraryKeyStoreSelect);
  useEffect(() => {
    async function getMultipleCardDecks() {
      try {
        const getMainKeyRqs = await AsyncStorage.getItem(KEY.SAVE_LIB);
        const mainKeyRqs = !getMainKeyRqs ? [] : JSON.parse(getMainKeyRqs);
        setMainKeys(mainKeyRqs);
        const rawKeyStores =
          keyStores.length !== 0 ? keyStores.concat(mainKeyRqs) : mainKeyRqs;

        const uniqueStoreKeys = select.uniqueElement(rawKeyStores);
        replace.lastElementWhenExceedLength(
          uniqueStoreKeys,
          renderLimit?.LIB_CARD_DECKS,
        );
        // setHasStoreKey(uniqueStoreKeys.includes(defaultKeyStore));
        const cardDeckRqs =
          uniqueStoreKeys && (await AsyncStorage.multiGet(uniqueStoreKeys));
        const retrievedData = [];
        cardDeckRqs.forEach(item => {
          const [, cardDeck] = item || {};
          cardDeck && retrievedData.push(JSON.parse(cardDeck));
        });
        setLibraryCardDeck(retrievedData);
      } catch (e) {
        console.log('get main keys error: ', e);
      }
    }

    getMultipleCardDecks();
  }, [keyStores]);
  useEffect(() => {
    navigation.setOptions({
      header: () => {
        return (
          <LibraryTopAppBar
            navigation={navigation}
            ref={topBarRef}
            onSortingListByChipId={handleSortingListByChipId}
            chipId={selectedChip}
          />
        );
      },
    });
  }, [navigation, selectedChip]);

  function handleSortingListByChipId(hashtag) {
    return hashtag === selectedChip
      ? setSelectedChip(null)
      : setSelectedChip(hashtag);
  }

  async function handleClearStoragePress() {
    try {
      await AsyncStorage.removeItem(KEY.SAVE_LIB);
    } catch (e) {
      console.log('Clear lib storage get error: ', e);
    }
  }

  if (!libraryCardDeck) {
    return <SpinnerType1 />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <CustomStatusBar />
      <FilledButton
        content={'clear lib storage'}
        onPress={handleClearStoragePress}
      />
      {libraryCardDeck && libraryCardDeck.length === 0 ? (
        <EmptyInfoAnnouncement
          title={'Thư viện của bạn đang trống'}
          subTitle={
            'Để thêm mới bộ bài vào thư viện, đi đến màn hình Xem trước, nhấn biểu tượng Lưu.\n' +
            'Để sử dụng tính năng khác, ấn giữ bộ bài.'
          }
          style={styles.emptyView}
        />
      ) : (
        <ScrollView
          onScroll={topBarRef.current?.onScroll}
          contentContainerStyle={styles.contentContainer}>
          <LibraryCardDecks
            data={libraryCardDeck}
            navigation={navigation}
            selectedChip={selectedChip}
          />
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: Color.light[ColorVariant.background].base,
  },
  contentContainer: {
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 70,
  },
  sectionHeader: {
    justifyContent: 'flex-start',
  },
  emptyView: {
    paddingHorizontal: 36,
    paddingVertical: 150,
  },
});
