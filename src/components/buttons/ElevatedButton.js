import React from 'react';
import {ColorVariant} from 'src/themes/color';
import {Color} from 'src/themes';
import {Typography} from '../../themes';
import {Pressable} from 'react-native';
import {TextContent} from '../content';
import buttonStyle from './buttonStyle';
import {Elevation1, Elevation5} from '../elevations/Elevation';

export default function ElevatedButton(props) {
  const {
    content,
    onPress = () => {},
    colorVariant = ColorVariant.primary,
    typographyVariant = Typography.label.large,
    contentStyle,
    style,
    ...otherProps
  } = props;

  const {base} = Color.light[colorVariant];
  const bodyButton = [{backgroundColor: 'transparent'}, style];
  const elevationStyle = [buttonStyle.shape];
  const labelStyle = [typographyVariant, {color: base}, contentStyle];

  return (
    <Elevation1 containerStyle={elevationStyle}>
      <Pressable {...otherProps} style={bodyButton} onPress={onPress}>
        {content && <TextContent content={content} contentStyle={labelStyle} />}
      </Pressable>
    </Elevation1>
  );
}

const Contentt = 'Play now';
