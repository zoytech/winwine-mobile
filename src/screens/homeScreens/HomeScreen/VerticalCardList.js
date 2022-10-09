import React from 'react';
import {FlatList, SectionList, StyleSheet, Text, View} from 'react-native';
import MiniCardItem from '../components/MiniCardItem';

export default function VerticalCardList(props) {
  const {style, data, onItemPressed = () => {}} = props;

  function handleItemPressed({item, index}) {
    onItemPressed({item, index});
  }

  function renderItem({item, index}) {
    return (
      <MiniCardItem
        data={item}
        onPress={() => handleItemPressed({item, index})}
      />
    );
  }

  return (
    <>
      <FlatList
        style={[styles.container, style]}
        ItemSeparatorComponent={<View style={styles.separator} />}
        data={data}
        renderItem={renderItem}
      />
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    flexDirection: 'column',
    flexWrap: 'wrap',
  },

  separator: {
    width: 16,
  },
});
