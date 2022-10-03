import React from 'react';
import {ColorVariant} from 'src/themes/color';
import {Color, Elevations} from 'src/themes';
import {StateLayers, Typography} from '../../themes';
import {Pressable, Text} from 'react-native';
import DefaultButtonStyle from './defaultButtonStyle';
import Surfaces from '../utils/elevationWithLinearGradient/surfaces';

export default function ElevatedButton(props) {
  const {
    content,
    style,
    contentStyle: rawContentStyle,
    colorPrimary = ColorVariant.primary,
    elevation = Elevations.light.elevation1,
    surfacesVariant = Surfaces.light,
    typographyVariant = Typography.label.large,
    disabled,
    children,
    ...otherProps
  } = props;

  function generateStateStyles(pressed, isDisabled) {
    const defaultContainerStyle = DefaultButtonStyle.container;
    const defaultContentStyle = typographyVariant;
    const {base: baseColor, onBase: onBaseColor} = Color.light[colorPrimary];
    if (isDisabled) {
      return {
        containerStyle: [
          defaultContainerStyle,
          {backgroundColor: onBaseColor},
          StateLayers.pressed,
          style,
        ],
        contentStyle: [
          defaultContentStyle,
          {color: onBaseColor},
          StateLayers.disabled,
          rawContentStyle,
        ],
      };
    }
    const surfaceColor = surfacesVariant?.surface2;
    if (pressed) {
      return {
        containerStyle: [
          defaultContainerStyle,
          elevation,
          {backgroundColor: surfaceColor},
          StateLayers.pressed,
          style,
        ],
        contentStyle: [
          defaultContentStyle,
          {color: baseColor},
          StateLayers.pressed,
          rawContentStyle,
        ],
      };
    }
    return {
      containerStyle: [
        defaultContainerStyle,
        elevation,
        {backgroundColor: surfaceColor},
        style,
      ],
      contentStyle: [defaultContentStyle, {color: baseColor}, rawContentStyle],
    };
  }

  function getContainerStyle({pressed}) {
    return generateStateStyles(pressed, disabled)?.containerStyle;
  }

  function renderContent({pressed}) {
    const contentStyle = generateStateStyles(pressed, disabled)?.contentStyle;
    return (
      <>
        {children}
        {content && <Text style={contentStyle}>{content}</Text>}
      </>
    );
  }

  return (
    <Pressable {...otherProps} style={getContainerStyle}>
      {renderContent}
    </Pressable>
  );
}
