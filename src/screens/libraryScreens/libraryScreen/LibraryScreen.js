import React, {useEffect, useRef, useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Color, ColorVariant} from 'src/themes';
import {
  cardDeckListSelector,
  cardDeckListSelector2,
  requestingDeckListSelector,
  requestingDeckListSelector2,
} from 'src/redux/selectors';
import {FilledButton, SpinnerType1} from 'src/components';
import {loadCardDeckList2} from 'src/redux/actions';
import {removeIdenticalItemInArray, useThrottleFn} from 'src/utils';
import {CustomStatusBar, EmptyInfoAnnouncement} from 'src/screens/components';
import {CardDeckList, LibraryTopAppBar} from './components';
import {tagItem} from 'src/constants';

export default function LibraryScreen({navigation}) {
  const topBarRef = useRef({
    onScroll: () => {},
  });
  const dispatch = useDispatch();
  const cardDeckList2 = useSelector(cardDeckListSelector2);
  const requesting2 = useSelector(requestingDeckListSelector2);
  const cardDeckList = useSelector(cardDeckListSelector);
  const requesting = useSelector(requestingDeckListSelector);
  const localStorageData = cardDeckList?.popularData;
  const [selectedChip, setSelectedChip] = useState(null);
  const rawTagIdData = localStorageData.map(item => item?.tag);
  const tagIdData = removeIdenticalItemInArray(rawTagIdData);

  const tagChipData = [
    {
      tagChipId: tagIdData[0],
      tagChipContent: tagItem.ADULT,
    },
    {
      tagChipId: tagIdData[1],
      tagChipContent: tagItem.BUDDY,
    },
    {
      tagChipId: tagIdData[2],
      tagChipContent: tagItem.FIRST_MEETING,
    },
    {
      tagChipId: tagIdData[3],
      tagChipContent: tagItem.KILLER,
    },
  ];
  useEffect(() => {
    dispatch(loadCardDeckList2());
  }, [dispatch]);

  useEffect(() => {
    navigation.setOptions({
      header: () => {
        return (
          <LibraryTopAppBar
            navigation={navigation}
            ref={topBarRef}
            onSortingListByChipId={handleSortingListByChipId}
            data={tagChipData}
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

  if (requesting2 || !cardDeckList2) {
    return <SpinnerType1 />;
  }
  return (
    <SafeAreaView style={styles.container}>
      <CustomStatusBar />
      {cardDeckList2.length === 0 ? (
        <EmptyInfoAnnouncement
          content={'Thư viện của bạn đang trống'}
          style={styles.emptyView}
        />
      ) : (
        <ScrollView
          onScroll={topBarRef.current?.onScroll}
          contentContainerStyle={styles.contentContainer}>
          <CardDeckList
            data={cardDeckList2}
            navigation={navigation}
            chipId={selectedChip}
          />
          <CardDeckList data={cardDeckList2} navigation={navigation} />
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
