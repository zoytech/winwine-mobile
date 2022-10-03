import React from 'react';
import {StyleSheet, Dimensions, Text} from 'react-native';
import ElevatedCard from '../../../components/cards/ElevatedCard';

const width = Dimensions.get('width');

export default function PreviewCard(props) {
  const {style, content, ...otherProps} = props;
  return (
    <ElevatedCard {...otherProps} style={[styles.container, style]}>
      <Text>{content}</Text>
    </ElevatedCard>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
    padding: 20,
    minWidth: width * 0.5,
    minHeight: width * 0.4,
  },
  text: {},
});
