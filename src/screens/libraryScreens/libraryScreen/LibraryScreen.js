import React, {useEffect, useRef, useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Color, ColorVariant} from 'src/themes';
import {
  cardDecksSelector,
  requestingCardDecksSelector,
} from 'src/redux/selectors';
import {SpinnerType1} from 'src/components';
import {loadCardDecks} from 'src/redux/actions';
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
  const [selectedChip, setSelectedChip] = useState(null);

  const tagChipData = {
    data: [
      {
        tagChipId: 'TC1',
        tagChipContent: tagCardDeck.ADULT,
      },
      {
        tagChipId: 'TC2',
        tagChipContent: tagCardDeck.BUDDY,
      },
      {
        tagChipId: 'TC3',
        tagChipContent: tagCardDeck.FIRST_MEETING,
      },
      {
        tagChipId: 'TC4',
        tagChipContent: tagCardDeck.KILLER,
      },
    ],
  };

  const tagList = tagChipData.data;
  useEffect(() => {
    dispatch(loadCardDecks());
  }, [dispatch]);

  useEffect(() => {
    navigation.setOptions({
      header: () => {
        return (
          <LibraryTopAppBar
            navigation={navigation}
            ref={topBarRef}
            onSortingListByChipId={handleSortingListByChipId}
            data={tagList}
            chipId={selectedChip}
          />
        );
      },
    });
  }, [navigation, selectedChip]);

  function handleSortingListByChipId(tagId) {
    if (tagId === selectedChip) {
      setSelectedChip(null);
    } else {
      setSelectedChip(tagId);
    }
  }

  if (requestingCardDecks || !localStorageData) {
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
