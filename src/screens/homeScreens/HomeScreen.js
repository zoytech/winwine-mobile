import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import API from '../../apis';
import {Color, ColorVariant} from 'src/themes';
import {
  HorizontalCardList,
  SectionHeader,
  SuggestionList,
  VerticalCardList,
} from './components';

export default function HomeScreen() {
  const {width: screenWidth} = Dimensions.get('screen');

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
    console.log('suggestionData: ', suggestedHashtagData);
    console.log('packageData: ', popularCardDecks);
    console.log('packageData: ', recentlyCardDecks);
    setSuggestedHashtag(suggestedHashtagData);
    setPopularCardDecks(popularCardDecksData);
    setRecentlyCardDecks(recentlyCardDecksData);
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <SuggestionList
          data={suggestedHashtag}
          style={styles.suggestedHashtag}
        />
        <View style={styles.recentlyCardDecks}>
          <SectionHeader content={'Recently'} />
          <HorizontalCardList data={recentlyCardDecks} />
        </View>
        <View style={styles.popularCardDecks}>
          <SectionHeader content={'Popular'} />
          <VerticalCardList data={popularCardDecks} />
        </View>
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
