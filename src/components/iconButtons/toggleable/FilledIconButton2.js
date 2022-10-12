import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import {FilledButton} from '../../buttons';
import DefaultIconButtonStyle from './defaultIconButtonStyle';
import {Color, ColorVariant} from 'src/themes';

export default function FilledIconButton(props) {
  const {
    name,
    colorVariant = ColorVariant.primary,
    children,
    style,
    ...otherProps
  } = props;
  const containerStyle = [DefaultIconButtonStyle.container, style];
  const iconProps = {
    name: name,
    size: 24,
    color: Color.light[colorVariant]?.onBase,
  };

  return (
    <FilledButton {...otherProps} style={containerStyle}>
      <Icon {...iconProps} />
    </FilledButton>
  );
}
