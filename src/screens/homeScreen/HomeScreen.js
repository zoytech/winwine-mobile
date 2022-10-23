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
import {cardDeckListSelector} from 'src/redux/selectors';
import {loadCardDeckList} from 'src/redux/actions';

export default function HomeScreen({navigation}) {
  const dispatch = useDispatch();
  const cardDeckList = useSelector(cardDeckListSelector);

  const {suggestData, popularData, recentlyData} = cardDeckList;
  console.log('popularData home: ', popularData);

  useEffect(() => {
    dispatch(loadCardDeckList());
  }, [dispatch]);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <SuggestionList data={suggestData} navigation={navigation} />
        <SectionHeader content={'Recently'} style={styles.sectionHeader} />
        <HorizontalCardList data={recentlyData} navigation={navigation} />
        <SectionHeader content={'Popular'} style={styles.sectionHeader} />
        <VerticalCardList data={popularData} navigation={navigation} />
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
