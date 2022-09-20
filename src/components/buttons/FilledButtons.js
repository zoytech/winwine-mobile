import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {ColorVariant} from 'src/themes/color';
import {Color} from 'src/themes';

export default function FilledButton(props) {
  const {
    content,
    colorVariant = ColorVariant.primary,
    children,
    ...otherProps
  } = props;
  const {onBase, base} = Color.light[colorVariant];
  return (
    <Pressable
      {...otherProps}
      style={[styles.container, {backgroundColor: base}]}>
      {content && <Text style={[styles.text, {color: onBase}]}>{content}</Text>}
      {children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {},
  text: {},
});
