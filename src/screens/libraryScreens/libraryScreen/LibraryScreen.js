import React, {useEffect, useRef, useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Color, ColorVariant} from 'src/themes';
import {libraryKeyStoreSelector} from 'src/redux/selectors';
import {CustomStatusBar, EmptyInfoAnnouncement} from 'src/screens/components';
import {LibraryCardDecks, LibraryTopAppBar} from './components';

export default function LibraryScreen({navigation}) {
  const topBarRef = useRef({
    onScroll: () => {},
  });

  const keyStores = useSelector(libraryKeyStoreSelector);
  const [libraryCardDeck, setLibraryCardDeck] = useState([]);
  const [selectedChip, setSelectedChip] = useState(null);
  console.log('flag');
  console.log(
    'libraryCardDeck: ',
    libraryCardDeck.map(item => item?.cardDeckId),
  );

  useEffect(() => {
    const getMultiple = async () => {
      try {
        const data = await AsyncStorage.multiGet(keyStores);
        const retrievedData = data.map(item => {
          const [keyStore, cardDeck] = item || {};
          return cardDeck != null ? JSON.parse(cardDeck) : null;
        });
        setLibraryCardDeck(retrievedData);
      } catch (e) {
        console.log('error read getMultiple in Lib');
      }
    };
    getMultiple();
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
    if (hashtag === selectedChip) {
      setSelectedChip(null);
    } else {
      setSelectedChip(hashtag);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <CustomStatusBar />
      {libraryCardDeck.length === 0 ? (
        <EmptyInfoAnnouncement
          content={'Thư viện của bạn đang trống'}
          style={styles.emptyView}
        />
      ) : (
        <ScrollView
          onScroll={topBarRef.current?.onScroll}
          contentContainerStyle={styles.contentContainer}>
          <LibraryCardDecks
            data={libraryCardDeck}
            navigation={navigation}
            chipId={selectedChip}
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
});
