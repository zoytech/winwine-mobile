import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import MiniCardItem from '../../components/MiniCardItem';

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
        showsVerticalScrollIndicator={false}
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
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },

  separator: {
    height: 32,
  },
});
