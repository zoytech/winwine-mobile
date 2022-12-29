import React, {useEffect, useRef, useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Color, ColorVariant} from 'src/themes';
import {
  cardDecksSelector,
  hashtagsSelector,
  requestingCardDecksSelector,
  requestingHashtagsSelector,
} from 'src/redux/selectors';
import {SpinnerType1} from 'src/components';
import {loadCardDecks, loadHashtags} from 'src/redux/actions';
import {CustomStatusBar, EmptyInfoAnnouncement} from 'src/screens/components';
import {LibraryCardDecks, LibraryTopAppBar} from './components';
import {tagCardDeck} from 'src/constants';

export default function LibraryScreen({navigation}) {
  const topBarRef = useRef({
    onScroll: () => {},
  });
  const dispatch = useDispatch();
  const localStorageData = useSelector(cardDecksSelector);
  const requestingCardDecks = useSelector(requestingCardDecksSelector);
  const hashtags = useSelector(hashtagsSelector);
  const requestingHashtags = useSelector(requestingHashtagsSelector);
  const [selectedChip, setSelectedChip] = useState(null);

  useEffect(() => {
    dispatch(loadCardDecks());
  }, [dispatch]);

  useEffect(() => {
    dispatch(loadHashtags());
  }, [dispatch]);

  useEffect(() => {
    navigation.setOptions({
      header: () => {
        return (
          <LibraryTopAppBar
            navigation={navigation}
            ref={topBarRef}
            onSortingListByChipId={handleSortingListByChipId}
            data={hashtags}
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

  if (requestingCardDecks && !localStorageData && requestingHashtags) {
    return <SpinnerType1 />;
  }
  return (
    <SafeAreaView style={styles.container}>
      <CustomStatusBar />
      {localStorageData.length === 0 ? (
        <EmptyInfoAnnouncement
          content={'Thư viện của bạn đang trống'}
          style={styles.emptyView}
        />
      ) : (
        <ScrollView
          onScroll={topBarRef.current?.onScroll}
          contentContainerStyle={styles.contentContainer}>
          <LibraryCardDecks
            data={localStorageData}
            navigation={navigation}
            chipId={selectedChip}
          />
          <LibraryCardDecks data={localStorageData} navigation={navigation} />
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
