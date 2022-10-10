import React from 'react';
import {Dimensions, FlatList, SafeAreaView, StyleSheet} from 'react-native';
import {Color, ColorVariant} from 'src/themes';
import {
  HorizontalCardList,
  SectionHeader,
  SuggestionList,
  VerticalCardList,
} from './components';

const {width: screenWidth} = Dimensions.get('screen');

const SuggestionsData = [
  {content: 'Drinking Game', selected: true},
  {
    content: 'Truth or dare',
    selected: false,
  },
  {content: 'Truth or dare 2', selected: false},
];

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

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={SECTIONS}
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <SuggestionList
            style={styles.suggestionsView}
            data={SuggestionsData}
          />
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

const SECTIONS = [
  {
    title: 'Recently',
    horizontal: true,
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
      {
        key: '6',
        head: 'Item text 6',
        tag: '18+',
        uri: 'https://picsum.photos/id/1016/200',
      },
    ],
  },
  {
    title: 'On trending',
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
      {
        key: '6',
        head: 'Item text 6',
        tag: '18+',
        uri: 'https://picsum.photos/id/1038/200',
      },
    ],
  },
  {
    title: 'Made for you',
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
      {
        key: '6',
        head: 'Item text 6',
        tag: '18+',
        uri: 'https://picsum.photos/id/1008/200',
      },
    ],
  },
];
