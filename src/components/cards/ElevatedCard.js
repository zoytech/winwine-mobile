import React from 'react';
import {SurfacesColor} from 'src/themes';
import DefaultCardStyle from './defaultCardStyle';
import {View} from 'react-native';

export default function ElevatedCard(props) {
  const {style, containerStyle, children, ...otherProps} = props;

  const surfaceColor = SurfacesColor.light?.surface1;
  const childrenStyle = [
    DefaultCardStyle.container,
    {
      backgroundColor: surfaceColor,
      elevation: 3,
      borderRadius: 1,
    },
    style,
  ];
  return (
    <View {...otherProps} style={childrenStyle}>
      {children}
    </View>
  );
}
