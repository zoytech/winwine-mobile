import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Typography} from 'src/themes';

export default function SectionHeader(props) {
  const {content, contentStyle, style} = props;
  //TODO: add icon
  return (
    <View style={[styles.container, style]}>
      <Text style={[styles.content, contentStyle]}>{content}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  content: {
    ...Typography.label.large,
  },
});
