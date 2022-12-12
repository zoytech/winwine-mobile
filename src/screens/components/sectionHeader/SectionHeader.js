import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Color, ColorVariant, Typography} from 'src/themes';

export default function SectionHeader(props) {
  const {content, contentStyle, style, ...otherProps} = props;
  return (
    <View {...otherProps} style={styles.container}>
      {content && <Text style={styles.content}>{content}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  content: {
    ...Typography.title.large,
    color: Color.light[ColorVariant.surfaceVariant]?.onBase,
    fontWeight: 'bold',
  },
});
