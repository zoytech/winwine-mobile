import React from 'react';
import {StyleSheet, View} from 'react-native';
import MiniCardItem from './miniCardItem';

export default function VerticalCardList(props) {
  const {style, data, onItemPressed = () => {}, ...otherProps} = props;

  function handleItemPressed(item, index) {
    onItemPressed(item, index);
  }

  function renderItem(item) {
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
    <View style={[styles.container, style]}>
      {data && data.map(item => renderItem(item))}
    </View>
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
