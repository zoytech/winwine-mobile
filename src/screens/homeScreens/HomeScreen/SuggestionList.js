import React, {useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {SuggestionChip} from 'src/components';

export default function SuggestionList(props) {
  const {style, data, onItemPressed = () => {}} = props;
  const [selectedItemName, setSelectedItemName] = useState(null);

  function handleItemPressed({item, index}) {
    setSelectedItemName(item?.content);
    onItemPressed({item, index});
  }

  function renderItem({item, index}) {
    const {content} = item || {};
    return (
      <SuggestionChip
        content={content}
        selected={content === selectedItemName}
        onPress={() => handleItemPressed({item, index})}
      />
    );
  }

  return (
    <FlatList
      horizontal={true}
      ItemSeparatorComponent={<View style={styles.separator} />}
      style={styles.container}
      data={data}
      renderItem={renderItem}
    />
  );
}
const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
  },
  separator: {
    width: 4,
  },
});
