import React, {useState} from 'react';
import {ColorVariant} from 'src/themes/color';
import {Color} from 'src/themes';
import {Typography} from '../../themes';
import {TouchableHighlight} from 'react-native';
import {TextContent} from '../content';
import buttonStyle from './buttonStyle';
import StateLayers from '../../themes/stateLayers';

export default function FilledButton(props) {
  const {
    content,
    onPress = () => {},
    colorVariant = ColorVariant.primary,
    stateLayers = StateLayers,
    typographyVariant = Typography.label.large,
    contentStyle,
    style,
    ...otherProps
  } = props;
  const {onBase, base} = Color.light[colorVariant];
  const [isPress, setIsPress] = useState(false);
  const {press} = stateLayers;
  const bodyButton = [buttonStyle.shape, style];
  const labelStyle = [typographyVariant, {color: onBase}, contentStyle];
  const enabledButton = [{backgroundColor: base}, bodyButton];
  const pressedButton = [press, enabledButton];

  const touchProps = {
    activeOpacity: press,
    underlayColor: base,
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
