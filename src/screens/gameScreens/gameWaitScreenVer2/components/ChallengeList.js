import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {Color, ColorVariant, Typography} from 'src/themes';
import {FilledCard} from '../../../../components';

export default function ChallengeList(props) {
  const {data, style, contentStyle} = props;

  const textColor = Color.light[ColorVariant.surfaceVariant]?.onBase;
  const textStyles = [
    contentStyle,
    Typography.body.large,
    {color: textColor},
    styles.text,
  ];

  function renderItem({item}) {
    const {task: task, cardId: id} = item || {};
    return (
      <FilledCard style={styles.listItem} key={id}>
        <Text style={textStyles}>{task}</Text>
      </FilledCard>
    );
  }

  return (
    <FlatList
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
    justifyContent: 'center',
  },
  separator: {
    height: 12,
  },
  listItem: {
    height: 120,
    borderRadius: 0,
    paddingHorizontal: 12,
    justifyContent: 'center',
  },
});
