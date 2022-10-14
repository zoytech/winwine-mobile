import React, {useEffect, useState} from 'react';
import {Dimensions, FlatList, SafeAreaView, StyleSheet} from 'react-native';
import API from '../../api';
import {Color, ColorVariant} from 'src/themes';
import {
  HorizontalCardList,
  SectionHeader,
  SuggestionList,
  VerticalCardList,
} from './components';

export default function HomeScreen() {
  const {width: screenWidth} = Dimensions.get('screen');

  const [suggestion, setSuggestion] = useState([]);
  const [packageInfo, setPackageInfo] = useState([]);
  useEffect(() => {
    getHomeScreenData();
  }, []);

  const getHomeScreenData = async () => {
    const [suggestionData, packageData] = await Promise.all([
      API.getSuggestionGameList(),
      API.getQuestionHomeScreenList(),
    ]);
    console.log('suggestionData: ', suggestionData);
    console.log('packageData: ', packageData);
    setSuggestion(suggestionData);
    setPackageInfo(packageData);
  };

  const renderListItem = ({item}) => {
    if (item?.horizontal) {
      return (
        <>
          <SectionHeader content={item?.title} />
          <HorizontalCardList data={item?.data} index={item?.key} />
        </>
      );
    }

    return (
      <>
        <SectionHeader content={item?.title} />
        <VerticalCardList data={item?.data} index={item?.key} />
      </>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={packageInfo}
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <SuggestionList style={styles.suggestionsView} data={suggestion} />
        }
        renderItem={renderListItem}
      />
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
  suggestionsView: {},
  shadow: {
    margin: 16,
  },
  test: {
    backgroundColor: 'blue',
  },
});
