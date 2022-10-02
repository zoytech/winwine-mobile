import React, {useState} from 'react';
import {ColorVariant} from 'src/themes/color';
import {Color} from 'src/themes';
import {Typography} from '../../themes';
import {TextContent} from '../content';
import DefaultButtonStyle from './defaultButtonStyle';
import StateLayers from '../../themes/stateLayers';
import {TouchableHighlight} from 'react-native';

export default function TextButton(props) {
  const {
    content,
    onPress,
    colorVariant = ColorVariant.primary,
    typographyVariant = Typography.label.large,
    stateLayers = StateLayers,
    contentStyle,
    style,
    ...otherProps
  } = props;

  const {onBase, base} = Color.light[colorVariant];
  const bodyButton = [DefaultButtonStyle.shape, style];
  const labelStyle = [typographyVariant, {color: base}, contentStyle];

  const [isPress, setIsPress] = useState(false);
  const {pressed} = stateLayers;

  const enabledButton = [{backgroundColor: onBase}, bodyButton];
  const pressedButton = [pressed, enabledButton];

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
