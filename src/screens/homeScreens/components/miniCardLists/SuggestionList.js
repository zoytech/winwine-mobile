import React, {useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {SuggestionChip} from 'src/components';

export default function SuggestionList(props) {
  const {style, data, onItemPressed = () => {}, ...otherProps} = props;
  const [selectedItemName, setSelectedItemName] = useState(null);

  function handleItemPressed({item, index}) {
    setSelectedItemName(item?.content);
    onItemPressed({item, index});
  }

  function renderItem({item, index}) {
    const {content} = item || {};
    return (
      <SuggestionChip
        {...otherProps}
        key={index}
        content={content}
        selected={content === selectedItemName}
        onPress={() => handleItemPressed({item, index})}
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
    width: 4,
  },
});
