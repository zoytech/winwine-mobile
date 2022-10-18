import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import MiniCardItem from './miniCardItem';

export default function HorizontalCardList(props) {
  const {style, data, onItemPressed = () => {}, ...otherProps} = props;

  function handleItemPressed(item, id) {
    onItemPressed(item, id);
  }

  function renderItem({item}) {
    const id = item?.cardDeckId;
    return (
      <MiniCardItem
        {...otherProps}
        key={id}
        data={item}
        onPress={() => handleItemPressed(item, id)}
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
