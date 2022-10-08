import React, {useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {SuggestionChip} from 'src/components';
import MiniCardItem from '../components/MiniCardItem';
import SectionHeader from './SectionHeader';

export default function HorizontalCardListList(props) {
  const {style, title, data, onItemPressed = () => {}} = props;

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
        horizontal={true}
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
  },

  separator: {
    width: 16,
  },
});
