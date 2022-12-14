import React, {useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {SuggestionChip} from 'src/components';

const chipId = {
  ADULT: '18+',
  BUDDY: 'Bạn thân',
  NEW_MEETING: 'Mới quen',
  TIPSY: 'Tới bến',
};

export default function TagChipList(props) {
  const {style, data, navigation, route, ...otherProps} = props;
  const [selectedChip, setSelectedChip] = useState(true);

  function renderItem({item, index}) {
    console.log('content: ', item);
    return (
      <SuggestionChip
        {...otherProps}
        key={index}
        content={item}
        style={styles.chip}
        selected={index === selectedChip}
        hasTrailingIcon={true}
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
