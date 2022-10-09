import React from 'react';
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  SectionList,
  StyleSheet,
  Text,
} from 'react-native';
import {Color, ColorVariant, Typography} from 'src/themes';
import SuggestionList from './SuggestionList';
import SectionHeader from './SectionHeader';
import HorizontalCardList from './HorizontalCardList';
import VerticalCardList from './VerticalCardList';
import MiniCardItem from '../components/MiniCardItem';

const {width: screenWidth} = Dimensions.get('screen');

const SuggestionsData = [
  {content: 'Drinking Game', selected: true},
  {content: 'Truth or dare', selected: false},
  {content: 'Truth or dare 2', selected: false},
];

export default function HomeScreen(props) {
  const {typoChip = Typography.label.large} = props;
  return (
    <SafeAreaView style={styles.container}>
      <SuggestionList style={styles.suggestionsView} data={SuggestionsData} />
      <SectionList
        contentContainerStyle={styles.contentContainer}
        stickySectionHeadersEnabled={false}
        sections={SECTIONS}
        renderSectionHeader={({section}) => (
          <>
            <SectionHeader content={section?.title} />
            {section.horizontal ? (
              <HorizontalCardList data={section?.data} />
            ) : null}
          </>
        )}
        renderItem={({item, section}) => {
          if (section.horizontal) {
            return null;
          }
          return <MiniCardItem data={item} />;
        }}
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

const SECTIONS = [
  {
    title: 'Made for you',
    horizontal: true,
    data: [
      {
        key: '1',
        head: 'Item text 1',
        tag: '18+',
        uri: 'https://picsum.photos/id/1/200',
      },
      {
        key: '2',
        head: 'Item text 2',
        tag: '18+',
        uri: 'https://picsum.photos/id/10/200',
      },

      {
        key: '3',
        head: 'Item text 3',
        tag: '18+',
        uri: 'https://picsum.photos/id/1002/200',
      },
      {
        key: '4',
        head: 'Item text 4',
        tag: '18+',
        uri: 'https://picsum.photos/id/1006/200',
      },
      {
        key: '5',
        head: 'Item text 5',
        tag: '18+',
        uri: 'https://picsum.photos/id/1008/200',
      },
    ],
  },
  {
    title: 'Recently',
    data: [
      {
        key: '1',
        head: 'Item text 1',
        tag: '18+',
        uri: 'https://picsum.photos/id/1011/200',
      },
      {
        key: '2',
        head: 'Item text 2',
        tag: '18+',
        uri: 'https://picsum.photos/id/1012/200',
      },

      {
        key: '3',
        head: 'Item text 3',
        tag: '18+',
        uri: 'https://picsum.photos/id/1013/200',
      },
      {
        key: '4',
        head: 'Item text 4',
        tag: '18+',
        uri: 'https://picsum.photos/id/1015/200',
      },
      {
        key: '5',
        head: 'Item text 5',
        tag: '18+',
        uri: 'https://picsum.photos/id/1016/200',
      },
    ],
  },
  {
    title: 'Top trending',
    data: [
      {
        key: '1',
        head: 'Item text 1',
        tag: '18+',
        uri: 'https://picsum.photos/id/1020/200',
      },
      {
        key: '2',
        head: 'Item text 2',
        tag: '18+',
        uri: 'https://picsum.photos/id/1024/200',
      },

      {
        key: '3',
        head: 'Item text 3',
        tag: '18+',
        uri: 'https://picsum.photos/id/1027/200',
      },
      {
        key: '4',
        head: 'Item text 4',
        tag: '18+',
        uri: 'https://picsum.photos/id/1035/200',
      },
      {
        key: '5',
        head: 'Item text 5',
        tag: '18+',
        uri: 'https://picsum.photos/id/1038/200',
      },
    ],
  },
];
