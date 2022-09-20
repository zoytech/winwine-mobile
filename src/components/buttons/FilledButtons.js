import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {ColorVariant} from 'src/themes/color';
import {Color} from 'src/themes';

export default function FilledButton(props) {
  const {
    content,
    color = ColorVariant.primary,
    children,
    ...otherProps
  } = props;

  const backgroundColor = Color.light[color];

  return (
    <Pressable {...otherProps} style={[styles.container, {backgroundColor}]}>
      {content && <Text style={styles.text}>{content}</Text>}
      {children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {},
  text: {},
});
