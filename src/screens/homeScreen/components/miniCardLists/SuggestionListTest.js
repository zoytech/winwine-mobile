import React, {useState, useCallback} from 'react';
import {FlatList, InteractionManager, StyleSheet, View} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {SuggestionChip} from 'src/components';
import {ScreenKeys} from 'src/navigations/ScreenKeys';
import {loadCardDeckById} from '../../../../redux/actions';

export default function SuggestionList(props) {
  const {style, data, navigation, route, ...otherProps} = props;
  const defaultChipId = 'HTG1';
  const [selectedChip, setSelectedChip] = useState(defaultChipId);
  const [isSelected, setIsSelected] = useState(false);

  console.log('selectedChip: ', selectedChip);
  // useFocusEffect(
  //   useCallback(hashtagId => {
  //     const task = InteractionManager.runAfterInteractions(() => {
  //       handleItemPressed(hashtagId);
  //     });
  //     return setSelectedChip(true) && task.cancel();
  //   }, []),
  // );

  function handleItemPressed(hashtagId) {
    setSelectedChip(hashtagId);
    if (hashtagId === 'HTG2') {
      navigation.navigate({
        name: ScreenKeys.DIALOG_COMING_SOON,
      });
    }
  }

  // function handleItemOnPressIn(hashtagId) {
  //   setSelectedChip(hashtagId);
  //   if (hashtagId === 'HTG2') {
  //     navigation.navigate({
  //       name: ScreenKeys.DIALOG_COMING_SOON,
  //     });
  //     setSelectedChip(defaultChipId);
  //   }
  // }

  function renderItem({item}) {
    const {content, hashtagId} = item || {};
    return (
      <SuggestionChip
        {...otherProps}
        key={hashtagId}
        content={content}
        selected={hashtagId === selectedChip}
        onPress={() => handleItemPressed(hashtagId)}
        // onPressIn={() => handleItemOnPressIn(hashtagId)}
      />
    );
  }

  return (
    <FlatList
      horizontal={true}
      listKey={true}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      ItemSeparatorComponent={<View style={styles.separator} />}
      contentContainerStyle={[styles.contentContainer]}
      style={[styles.container, style]}
      data={data}
      renderItem={renderItem}
    />
  );
}
const styles = StyleSheet.create({
  contentContainer: {
    paddingVertical: 16,
    justifyContent: 'center',
  },
  separator: {
    width: 12,
  },
});
