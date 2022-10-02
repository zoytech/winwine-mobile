import React, {useState} from 'react';
import {ColorVariant} from 'src/themes/color';
import {Color} from 'src/themes';
import {Typography} from '../../themes';
import {TouchableHighlight} from 'react-native';
import {TextContent} from '../content';
import DefaultButtonStyle from './defaultButtonStyle';
import {Elevation1} from '../elevations/Elevation';
import StateLayers from '../../themes/stateLayers';

export default function ElevatedButton(props) {
  const {
    content,
    onPress = () => {},
    colorVariant = ColorVariant.primary,
    typographyVariant = Typography.label.large,
    stateLayers = StateLayers,
    contentStyle,
    style,
    ...otherProps
  } = props;

  const {base} = Color.light[colorVariant];
  const bodyButton = [style];
  const labelStyle = [typographyVariant, {color: base}, contentStyle];

  const [isPress, setIsPress] = useState(false);
  const {pressed} = stateLayers;

  const enabledButton = [{backgroundColor: 'transparent'}, bodyButton];
  const pressedButton = [pressed, enabledButton];
  const elevationStyle = [DefaultButtonStyle.shape, pressed];

  const touchProps = {
    activeOpacity: pressed,
    underlayColor: 'transparent',
    style: isPress ? pressedButton : enabledButton,
    onHideUnderlay: () => setIsPress(false),
    onShowUnderlay: () => setIsPress(true),
    onPress: onPress ? onPress : 'No action navigator',
  };

  return (
    <Elevation1 containerStyle={elevationStyle}>
      <TouchableHighlight {...otherProps} {...touchProps}>
        {content && <TextContent content={content} contentStyle={labelStyle} />}
      </TouchableHighlight>
    </Elevation1>
  );
}

const Contentt = 'Play now';
