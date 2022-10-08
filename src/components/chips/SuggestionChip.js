import React from 'react';
import {StyleSheet} from 'react-native';
import BaseChip from './BaseChip';

export default function SuggestionChip(props) {
  const {style, ...otherProps} = props;
  return <BaseChip {...otherProps} style={[styles.container, style]} />;
}
const styles = StyleSheet.create({
  container: {},
});
