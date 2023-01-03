import React, {useEffect, useRef, useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Color, ColorVariant} from 'src/themes';
import {libraryKeyStoreSelector} from 'src/redux/slices';
import {CustomStatusBar, EmptyInfoAnnouncement} from 'src/screens/components';
import {LibraryCardDecks, LibraryTopAppBar} from './components';

export default function LibraryScreen({navigation}) {
  const topBarRef = useRef({
    onScroll: () => {},
  });
  const [selectedChip, setSelectedChip] = useState(null);

  const [libraryCardDeck, setLibraryCardDeck] = useState([]);
  // const [retrieved, setRetrieved] = useState(false);
  const keyStores = useSelector(libraryKeyStoreSelector);

  useEffect(() => {
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

  async function getMultipleCardDecks() {
    try {
      const data = await AsyncStorage.multiGet(keyStores);
      const retrievedData = data.map(item => {
        const [keyStore, cardDeck] = item || {};
        return cardDeck != null ? JSON.parse(cardDeck) : null;
      });
      setLibraryCardDeck(retrievedData);
    } catch (e) {
      console.log('error read getMultiple in Lib: ', e);
    }
  }

  function handleSortingListByChipId(hashtag) {
    return hashtag === selectedChip
      ? setSelectedChip(null)
      : setSelectedChip(hashtag);
  }

  return (
    <SafeAreaView style={styles.container}>
      <CustomStatusBar />
      {libraryCardDeck.length === 0 ? (
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
