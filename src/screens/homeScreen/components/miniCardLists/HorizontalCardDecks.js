import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {ScreenKeys} from 'src/navigations/ScreenKeys';
import {DECK} from 'src/constants';
import {MiniCardItem} from 'src/screens/components';

export default function HorizontalCardDecks(props) {
  const {style, data, navigation, ...otherProps} = props;

  const handlePlayPress = item => {
    const {cardDeckId, cardDeckName, cardDeckImage, hashtags} = item;
    navigation.navigate({
      name: ScreenKeys.PLAY_GAME,
      params: {
        cardDeckIdParam: cardDeckId ? cardDeckId : '',
        cardDeckNameParam: cardDeckName ? cardDeckName : DECK?.NAME,
        cardDeckImageParam: cardDeckImage ? {uri: cardDeckImage} : DECK?.IMAGE,
        hashtagsParam: hashtags ? hashtags : DECK?.TAG,
      },
    });
  };
  const handlePreviewPress = item => {
    const {cardDeckId, cardDeckName, cardDeckImage} = item;
    navigation.navigate({
      name: ScreenKeys.WAIT_GAME,
      params: {
        cardDeckIdParam: cardDeckId ? cardDeckId : '',
        cardDeckNameParam: cardDeckName ? cardDeckName : DECK?.NAME,
        cardDeckImageParam: cardDeckImage ? {uri: cardDeckImage} : DECK?.IMAGE,
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
        onPreviewPress={() => handlePreviewPress(item)}
        onPlayPress={() => handlePlayPress(item)}
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
    width: 16,
  },
});
