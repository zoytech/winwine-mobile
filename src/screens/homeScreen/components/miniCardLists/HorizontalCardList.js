import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {ScreenKeys} from 'src/navigations/ScreenKeys';
import {defaultOfDeck} from 'src/constants';
import {MiniCardItem} from 'src/screens/components';

export default function HorizontalCardList(props) {
  const {style, data, navigation, ...otherProps} = props;
  const {TITLE, IMAGE} = defaultOfDeck;

  const handleImageAreaPress = ({cardDeckId, cardDeck, uri}) => {
    navigation.navigate({
      name: ScreenKeys.PLAY_GAME,
      params: {
        deckId: cardDeckId ? cardDeckId : '',
        deckTitle: cardDeck ? cardDeck : TITLE,
        deckSource: uri ? {uri: uri} : IMAGE,
      },
    });
  };
  const handleButtonPress = ({cardDeckId, cardDeck, uri}) => {
    navigation.navigate({
      name: ScreenKeys.WAIT_GAME,
      params: {
        deckId: cardDeckId ? cardDeckId : '',
        deckTitle: cardDeck ? cardDeck : TITLE,
        deckSource: uri ? {uri: uri} : IMAGE,
      },
    });
  };

  function renderItem({item}) {
    const cardDeckId = item?.cardDeckId;
    return (
      <MiniCardItem
        {...otherProps}
        key={cardDeckId}
        data={item}
        onImageAreaPress={() => handleImageAreaPress(item)}
        onButtonPress={() => handleButtonPress(item)}
      />
    );
  }

  return (
    <>
      <FlatList
        style={[styles.container, style]}
        horizontal={true}
        listKey={true}
        ItemSeparatorComponent={<View style={styles.separator} />}
        data={data}
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[styles.contentContainer]}
      />
    </>
  );
}
const styles = StyleSheet.create({
  container: {},
  contentContainer: {
    paddingVertical: 16,
    justifyContent: 'center',
  },
  separator: {
    width: 32,
  },
});
