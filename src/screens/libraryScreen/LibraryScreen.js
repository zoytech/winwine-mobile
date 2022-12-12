import React, {useEffect, useRef} from 'react';
import {SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Color, ColorVariant} from 'src/themes';
import {
  cardDeckListSelector2,
  requestingDeckListSelector2,
} from 'src/redux/selectors';
import {SpinnerType1} from 'src/components';
import {CardDeckList, LibraryTopAppBar} from './components';
import loadCardDeckList2 from 'src/redux/actions/loadCardDeckList2';
import {SectionHeader} from '../components';

export default function LibraryScreen({navigation}) {
  const topBarRef = useRef({
    onScroll: () => {},
  });
  const dispatch = useDispatch();
  const cardDeckList2 = useSelector(cardDeckListSelector2);
  const requesting2 = useSelector(requestingDeckListSelector2);
  useEffect(() => {
    dispatch(loadCardDeckList2());
  }, [dispatch]);

  useEffect(() => {
    navigation.setOptions({
      header: () => {
        return <LibraryTopAppBar navigation={navigation} ref={topBarRef} />;
      },
    });
  }, [navigation]);

  if (requesting2) {
    return <SpinnerType1 />;
  }
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        onScroll={topBarRef.current?.onScroll}
        contentContainerStyle={styles.contentContainer}>
        <SectionHeader content={'Library'} style={styles.sectionHeader} />
        <CardDeckList data={cardDeckList2} navigation={navigation} />
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
  },
  sectionHeader: {
    justifyContent: 'flex-start',
  },
});
