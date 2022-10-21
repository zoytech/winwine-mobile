import React, {useEffect} from 'react';
import {SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Color, ColorVariant} from 'src/themes';
import {
  HorizontalCardList,
  SectionHeader,
  SuggestionList,
  VerticalCardList,
} from './components';
import {
  loadPopularCardDecks,
  loadRecentlyCardDecks,
  loadSuggestedHashtag,
} from 'src/redux/actions';
import {
  popularCardDecksSelector,
  recentlyCardDecksSelector,
  suggestedCardDecksSelector,
} from 'src/redux/selectors';

export default function HomeScreen({navigation}) {
  const dispatch = useDispatch();
  const suggestedHashtag = useSelector(suggestedCardDecksSelector);
  const popularCardDecks = useSelector(popularCardDecksSelector);
  const recentlyCardDecks = useSelector(recentlyCardDecksSelector);
  console.log('homescreen: ');

  useEffect(() => {
    dispatch(loadSuggestedHashtag());
  }, [dispatch]);

  useEffect(() => {
    dispatch(loadPopularCardDecks());
  }, [dispatch]);

  useEffect(() => {
    dispatch(loadRecentlyCardDecks());
  }, [dispatch]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <SuggestionList data={suggestedHashtag} navigation={navigation} />
        <SectionHeader content={'Recently'} style={styles.sectionHeader} />
        <HorizontalCardList data={recentlyCardDecks} navigation={navigation} />
        <SectionHeader content={'Popular'} style={styles.sectionHeader} />
        <VerticalCardList data={popularCardDecks} navigation={navigation} />
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
