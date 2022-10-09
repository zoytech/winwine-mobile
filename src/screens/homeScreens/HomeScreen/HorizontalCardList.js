import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import MiniCardItem from '../components/MiniCardItem';

export default function HorizontalCardList(props) {
  const {style, data, onItemPressed = () => {}} = props;
  console.log(data);

  function handleItemPressed({item, key}) {
    onItemPressed({item, key});
  }

  function renderItem({item, key}) {
    return (
      <MiniCardItem
        data={item}
        onPress={() => handleItemPressed({item, key})}
      />
    );
  }

  return (
    <>
      <FlatList
        style={[styles.container, style]}
        horizontal={true}
        ItemSeparatorComponent={<View style={styles.separator} />}
        data={data}
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
      />
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
  },

  separator: {
    width: 16,
  },
});
