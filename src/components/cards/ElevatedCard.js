import React from 'react';
import {Shadow} from 'react-native-shadow-2';
import {ShadowPresets, SurfacesColor} from 'src/themes';
import DefaultCardStyle from './defaultCardStyle';

export default function ElevatedCard(props) {
  const {style, containerStyle, children, ...otherProps} = props;

  const shadowProps = ShadowPresets.normal;
  const defaultContainerStyle = DefaultCardStyle.container;
  const {surface1} = SurfacesColor.light;
  const childrenStyle = [
    defaultContainerStyle,
    {backgroundColor: surface1},
    style,
  ];
  return (
    <Shadow
      {...otherProps}
      {...shadowProps}
      style={childrenStyle}
      containerStyle={containerStyle}>
      {children}
    </Shadow>
  );
}
