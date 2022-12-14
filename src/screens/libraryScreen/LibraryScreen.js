import React, {useEffect, useRef} from 'react';
import {SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Color, ColorVariant} from 'src/themes';
import {
  cardDeckListSelector,
  cardDeckListSelector2,
  requestingDeckListSelector,
  requestingDeckListSelector2,
} from 'src/redux/selectors';
import {SpinnerType1} from 'src/components';
import {CardDeckList, LibraryTopAppBar} from './components';
import loadCardDeckList2 from 'src/redux/actions/loadCardDeckList2';
import {loadCardDeckList} from 'src/redux/actions';

export default function LibraryScreen({navigation}) {
  const topBarRef = useRef({
    onScroll: () => {},
  });
  const dispatch = useDispatch();
  const cardDeckList2 = useSelector(cardDeckListSelector2);
  const requesting2 = useSelector(requestingDeckListSelector2);
  const cardDeckList = useSelector(cardDeckListSelector);
  const requesting = useSelector(requestingDeckListSelector);
  const localStorageData = cardDeckList?.recentlyData;

  useEffect(() => {
    dispatch(loadCardDeckList2());
  }, [dispatch]);
  useEffect(() => {
    dispatch(loadCardDeckList());
  }, [dispatch]);

  useEffect(() => {
    navigation.setOptions({
      header: () => {
        return <LibraryTopAppBar navigation={navigation} ref={topBarRef} />;
      },
    });
  }, [navigation]);

  if (requesting2 || requesting) {
    return <SpinnerType1 />;
  }
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        onScroll={topBarRef.current?.onScroll}
        contentContainerStyle={styles.contentContainer}>
        <CardDeckList data={cardDeckList2} navigation={navigation} />
        <CardDeckList data={localStorageData} navigation={navigation} />
        <CardDeckList data={localStorageData} navigation={navigation} />
      </ScrollView>
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
    paddingHorizontal: 16,
    justifyContent: 'center',
    paddingBottom: 70,
  },
  sectionHeader: {
    justifyContent: 'flex-start',
  },
});
