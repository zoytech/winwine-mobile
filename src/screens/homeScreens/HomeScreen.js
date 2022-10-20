import React, {useEffect, useState} from 'react';
import {Dimensions, SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import API from '../../apis';
import {Color, ColorVariant} from 'src/themes';
import {
  HorizontalCardList,
  SectionHeader,
  SuggestionList,
  VerticalCardList,
} from './components';

export default function HomeScreen({navigation}) {
  const [suggestedHashtag, setSuggestedHashtag] = useState([]);
  const [popularCardDecks, setPopularCardDecks] = useState([]);
  const [recentlyCardDecks, setRecentlyCardDecks] = useState([]);

  useEffect(() => {
    getHomeScreenData();
  }, []);

  async function getHomeScreenData() {
    const [suggestedHashtagData, popularCardDecksData, recentlyCardDecksData] =
      await Promise.all([
        API.getSuggestedHashtag(),
        API.getRecentlyCardDecks(),
        API.getPopularCardDecks(),
      ]);
    setSuggestedHashtag(suggestedHashtagData?.data);
    setPopularCardDecks(popularCardDecksData?.data);
    setRecentlyCardDecks(recentlyCardDecksData?.data);
  }

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

/*
<FlatList
        data={popularCardDecks}
        style={r}
        contentContainerStyle={}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={

        }
        renderItem={renderListItem}
      />
 */
