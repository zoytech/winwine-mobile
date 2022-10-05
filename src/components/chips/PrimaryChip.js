import React from 'react';
import {Pressable, Text} from 'react-native';
import {Shadow} from 'react-native-shadow-2';
import {
  Color,
  ColorVariant,
  Elevations,
  StateLayers,
  StateLayersVariant,
  SurfacesColor,
  Typography,
} from 'src/themes';
import DefaultChipStyle from './defaultChipStyle';

export default function PrimaryChip(props) {
  const {
    content,
    style,
    contentStyle: rawContentStyle,
    colorPrimary = ColorVariant.primary,
    elevationVariant = Elevations.light,
    stateLayersOnSurface = StateLayersVariant.onSurface,
    stateLayersOnSurfaceVar = StateLayersVariant.onSurfaceVar,
    typographyVariant = Typography.label.large,
    disabled,
    children,
    dragged,
    ...otherProps
  } = props;

  function generateStateStyles(pressed, isDisabled, isDragged) {
    const defaultContainerStyle = DefaultChipStyle.container;
    const defaultContentStyle = typographyVariant;
    const {base: baseColor} = Color.light[colorPrimary];
    const {elevation1, elevation2, elevation3} = elevationVariant;
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
        shadowStyle: {disable: true},
      };
    }
    const {surface1} = SurfacesColor.light;
    const {level_100} = StateLayers.light[stateLayersOnSurfaceVar];
    const {level_012, level_016} = StateLayers.light[stateLayersOnSurface];
    if (pressed) {
      return {
        containerStyle: [
          defaultContainerStyle,
          // elevation2,
          {
            backgroundColor: level_012,
            shadowColor: surface1,
          },
          style,
        ],
        contentStyle: [
          defaultContentStyle,
          {color: baseColor},
          rawContentStyle,
        ],
      };
    }
    if (isDragged) {
      return {
        containerStyle: [
          defaultContainerStyle,
          // elevation3,
          {
            backgroundColor: level_016,
            shadowColor: surface1,
          },
          style,
        ],
        contentStyle: [
          defaultContentStyle,
          {color: level_100},
          rawContentStyle,
        ],
      };
    }
    return {
      containerStyle: [
        defaultContainerStyle,
        // elevation1,
        {backgroundColor: surface1},
        style,
      ],
      contentStyle: [defaultContentStyle, {color: baseColor}, rawContentStyle],
    };
  }

  function getContainerStyle({pressed}) {
    return generateStateStyles(pressed, disabled, dragged)?.containerStyle;
  }

  function renderContent({pressed}) {
    const contentStyle = generateStateStyles(
      pressed,
      disabled,
      dragged,
    )?.contentStyle;
    return (
      <>
        {children}
        {content && <Text style={contentStyle}>{content}</Text>}
      </>
    );
  }

  return (
    <Shadow {...otherProps}>
      <Pressable style={getContainerStyle}>{renderContent}</Pressable>
    </Shadow>
  );
}
