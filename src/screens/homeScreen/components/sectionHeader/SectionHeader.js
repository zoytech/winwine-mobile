import React from 'react';
import {StyleSheet} from 'react-native';
import {Color, ColorVariant, Typography} from 'src/themes';
import {StandardIconButton} from 'src/components';

export default function SectionHeader(props) {
  const {content, contentStyle, style, ...otherProps} = props;
  return (
    <StandardIconButton
      {...otherProps}
      name={'caretdown'}
      content={content}
      contentStyle={[styles.content, contentStyle]}
      style={[styles.container, style]}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    maxWidth: '50%',
  },
  content: {
    ...Typography.label.large,
    color: Color.light[ColorVariant.surfaceVariant]?.onBase,
    paddingLeft: 16,
  },
});
