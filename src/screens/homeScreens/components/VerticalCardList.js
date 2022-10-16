import React from 'react';
import {StyleSheet, View} from 'react-native';
import MiniCardItem from './MiniCardItem';

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
    <View style={styles.container}>
      {data && data.map((item, index) => renderItem({item, index}))}
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
