import React, {useState} from 'react';
import {ColorVariant} from 'src/themes/color';
import {Color} from 'src/themes';
import {Typography} from '../../themes';
import {Pressable, TouchableHighlight} from 'react-native';
import {TextContent} from '../content';
import DefaultButtonStyle from './defaultButtonStyle';
import StateLayers from '../../themes/stateLayers';

export default function OutlinedButton(props) {
  const {
    content,
    onPress = () => {},
    colorPrimary = ColorVariant.primary,
    colorOutline = ColorVariant.outline,
    stateLayers = StateLayers,
    typographyVariant = Typography.label.large,
    contentStyle,
    style,
    ...otherProps
  } = props;

  const {onBase, base} = Color.light[colorPrimary];
  const {base: border} = Color.light[colorOutline];
  const [isPress, setIsPress] = useState(false);
  const {pressed} = stateLayers;
  const bodyButton = [DefaultButtonStyle.shape, style];

  const enabledButton = [
    {
      backgroundColor: onBase,
      borderColor: border,
      borderWidth: 1,
    },
    bodyButton,
  ];
  const pressedButton = [pressed, enabledButton];
  const labelStyle = [typographyVariant, {color: base}, contentStyle];

  const touchProps = {
    activeOpacity: pressed,
    underlayColor: onBase,
    style: isPress ? pressedButton : enabledButton,
    onHideUnderlay: () => setIsPress(false),
    onShowUnderlay: () => setIsPress(true),
    onPress: onPress ? onPress : 'No action navigator',
  };

  return (
    <TouchableHighlight {...otherProps} {...touchProps}>
      {content && <TextContent content={content} contentStyle={labelStyle} />}
    </TouchableHighlight>
  );
}

const Contentt = 'Play now';
