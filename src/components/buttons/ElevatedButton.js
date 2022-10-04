import React from 'react';
import {ColorVariant} from 'src/themes/color';
import {Color, Elevations, StateLayersVariant} from 'src/themes';
import {StateLayers, SurfacesColor, Typography} from '../../themes';
import {Pressable, Text} from 'react-native';
import DefaultButtonStyle from './defaultButtonStyle';

export default function ElevatedButton(props) {
  const {
    content,
    style,
    contentStyle: rawContentStyle,
    colorPrimary = ColorVariant.primary,
    elevation = Elevations.light.elevation1,
    stateLayersOnPrimary = StateLayersVariant.onPrimary,
    stateLayersOnSurface = StateLayersVariant.onSurface,
    stateLayersPrimary = StateLayersVariant.primary,
    typographyVariant = Typography.label.large,
    disabled,
    children,
    ...otherProps
  } = props;

  function generateStateStyles(pressed, isDisabled) {
    const defaultContainerStyle = DefaultButtonStyle.container;
    const defaultContentStyle = typographyVariant;
    const {base: baseColor} = Color.light[colorPrimary];
    if (isDisabled) {
      const {level_012, level_032} = StateLayers.light[stateLayersOnSurface];
      return {
        containerStyle: [
          defaultContainerStyle,
          {backgroundColor: level_012},
          style,
        ],
        contentStyle: [
          defaultContentStyle,
          {color: level_032},
          rawContentStyle,
        ],
      };
    }
    const {surface1, surface2} = SurfacesColor.light;
    if (pressed) {
      return {
        containerStyle: [
          defaultContainerStyle,
          elevation,
          {backgroundColor: surface2},
          stateLayersPrimary.pressed,
          style,
        ],
        contentStyle: [
          defaultContentStyle,
          {color: baseColor},
          rawContentStyle,
        ],
      };
    }
    return {
      containerStyle: [
        defaultContainerStyle,
        elevation,
        {
          backgroundColor: surface1,
        },

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
