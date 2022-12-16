import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {SuggestionChip} from 'src/components';

export default function TagChipList(props) {
  const {
    navigation,
    route,
    data,
    chipId,
    style,
    onSortingListByChipId = () => {},
    ...otherProps
  } = props;
  const [selectedChip, setSelectedChip] = useState(null);

  function handleSortingListByChipId(tagId) {
    onSortingListByChipId(tagId);
    if (tagId === selectedChip) {
      setSelectedChip(null);
    } else {
      setSelectedChip(tagId);
    }
  }

  function renderItem({item}) {
    const {tagChipId: tagChipId, tagChipContent: content} = item || {};
    return (
      <SuggestionChip
        {...otherProps}
        key={tagChipId}
        content={content}
        style={styles.chip}
        hasTrailingIcon={true}
        selected={selectedChip === tagChipId}
        onPress={() => handleSortingListByChipId(tagChipId)}
        // icon={'github'}
        // image={avatarTest}
      />
    );
  }

  return (
    <FlatList
      horizontal={true}
      listKey={true}
      showsVerticalScrollIndicator={false}
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
    paddingLeft: 16,
    justifyContent: 'center',
  },
  separator: {
    width: 12,
  },
  chip: {
    borderRadius: 50,
  },
});
