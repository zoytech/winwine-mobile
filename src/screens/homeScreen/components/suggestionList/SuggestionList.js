import React, {useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {SuggestionChip} from 'src/components';
import {ScreenKeys} from 'src/navigations/ScreenKeys';

export default function SuggestionList(props) {
  const {
    style,
    data,
    navigation,
    onItemPressed = () => {},
    ...otherProps
  } = props;
  const [selected, setSelected] = useState(null);

  function handleItemPressed({content, hashtagId}) {
    setSelected(hashtagId);
    if (hashtagId === 'HTG2') {
      navigation.navigate({
        name: ScreenKeys.DIALOG_COMING_SOON,
      });
      setSelected('HTG1');
    }
    onItemPressed({content, hashtagId});
  }

  function renderItem({item}) {
    const {content, hashtagId} = item || {};
    return (
      <SuggestionChip
        {...otherProps}
        key={hashtagId}
        content={content}
        selected={hashtagId === selected}
        onPress={() => handleItemPressed({content, hashtagId})}
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
