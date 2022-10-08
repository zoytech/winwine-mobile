import React from 'react';
import {
  Dimensions,
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {Color, ColorVariant, Typography} from 'src/themes';
import MiniCardItem from '../components/MiniCardItem';
import SuggestionList from './SuggestionList';
import HorizontalCardListList from './HorizontalCardListList';
import SectionHeader from './SectionHeader';

const {width: screenWidth} = Dimensions.get('screen');

const SuggestionsData = [
  {content: 'Drinking Game', selected: true},
  {content: 'Truth or dare', selected: false},
  {content: 'Truth or dare 2', selected: false},
];

export default function HomeScreen(props) {
  const {typoChip = Typography.label.large} = props;

  const renderPackageItem = ({item}) => <MiniCardItem cardInfo={item} />;
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.contentContainer}>
        <SuggestionList style={styles.suggestionsView} data={SuggestionsData} />
        <SectionHeader content={'Gần đây'} />
        <HorizontalCardListList data={CARD_DATA} />
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
  suggestionsView: {},
  shadow: {
    margin: 16,
  },
  test: {
    backgroundColor: 'blue',
  },
});

const CARD_DATA = [
  {
    id: '123',
    title: 'Bai cua Nam',
    tag: 'Thieu nhi',
    totalCards: '30',
    avatar: 'N',
    currentCard: '28',
  },
  {
    id: '124',
    title: 'Bai cua Tu',
    tag: '18+',
    totalCards: '30',
    avatar: 'N',
    currentCard: '28',
  },
  {
    id: '125',
    title: 'Bai cua Minh',
    tag: 'Thieu nhi',
    totalCards: '40',
    avatar: 'M',
    currentCard: '28',
  },
];
