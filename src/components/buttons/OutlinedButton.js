import React from 'react';
import {ColorVariant} from 'src/themes/color';
import {Color} from 'src/themes';
import {Typography} from '../../themes';
import {Pressable} from 'react-native';
import {TextContent} from '../content';
import buttonStyle from './buttonStyle';

export default function OutlinedButton(props) {
  const {
    content,
    onPress = () => {},
    colorPrimary = ColorVariant.primary,
    colorOutline = ColorVariant.outline,
    typographyVariant = Typography.label.large,
    contentStyle,
    style,
    ...otherProps
  } = props;

  const {onBase, base} = Color.light[colorPrimary];
  const {base: border} = Color.light[colorOutline];
  const bodyButton = [
    {
      backgroundColor: onBase,
      borderColor: border,
      borderWidth: 1,
    },
    buttonStyle.shape,
    style,
  ];
  const labelStyle = [typographyVariant, {color: base}, contentStyle];

  return (
    <Pressable {...otherProps} style={bodyButton} onPress={onPress}>
      {content && <TextContent content={content} contentStyle={labelStyle} />}
    </Pressable>
  );
}

const Contentt = 'Play now';
