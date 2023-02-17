import React, {useEffect, useRef, useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {Color, ColorVariant} from 'src/themes';
import {libraryKeysSelect, selectCardDeckArray} from 'src/redux/slices';
import {KEY, LIMIT} from 'src/constants';
import {CustomStatusBar, EmptyInfoAnnouncement} from 'src/screens/components';
import {LibraryCardDecks, LibraryTopAppBar} from './components';
import {getDataFromStorage, getStoreKeysFromStorage} from 'src/utils';

export default function LibraryScreen({navigation}) {
  const topBarRef = useRef({
    onScroll: () => {},
  });
  const [selectedChip, setSelectedChip] = useState(null);
  const [libraryCardDeck, setLibraryCardDeck] = useState(null);
  const testLibraryCardDecks = useSelector(selectCardDeckArray);

  const keyStores = useSelector(libraryKeysSelect);
  useEffect(() => {
    async function getMultipleCardDecks() {
      try {
        const processedKeys = await getStoreKeysFromStorage(
          KEY?.SAVE_LIB,
          keyStores,
          LIMIT?.LIB_CARD_DECKS,
        );
        const retrievedData = await getDataFromStorage(processedKeys);
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

  return (
    <SafeAreaView style={styles.container}>
      <CustomStatusBar />
      {!testLibraryCardDecks ? (
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
            data={testLibraryCardDecks}
            navigation={navigation}
            selectedChip={selectedChip}
            isLoading={!testLibraryCardDecks}
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
