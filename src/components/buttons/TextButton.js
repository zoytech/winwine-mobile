import React from 'react';
import {ColorVariant} from 'src/themes/color';
import {Color} from 'src/themes';
import {Typography} from '../../themes';
import {Pressable} from 'react-native';
import {TextContent} from '../content';
import buttonStyle from './buttonStyle';

export default function TextButton(props) {
  const {
    content,
    onPress,
    colorVariant = ColorVariant.primary,
    typographyVariant = Typography.label.large,
    contentStyle,
    style,
    ...otherProps
  } = props;

  const {onBase, base} = Color.light[colorVariant];
  const bodyButton = [{backgroundColor: onBase}, buttonStyle.shape, style];
  const labelStyle = [typographyVariant, {color: base}, contentStyle];

  return (
    <Pressable {...otherProps} style={bodyButton} onPress={onPress}>
      {content && <TextContent content={content} contentStyle={labelStyle} />}
    </Pressable>
  );
}

const Contentt = 'Play now';
