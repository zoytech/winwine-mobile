import React from 'react';
import {Pressable, Text} from 'react-native';

import {
  Color,
  ColorVariant,
  StateLayers,
  StateLayersVariant,
  Typography,
} from 'src/themes';
import defaultChipStyle from './defaultChipStyle';

function generateStateStyles(selected, pressed, disabled) {
  if (disabled) {
    const {level_012: layerColor, level_038: textColor} =
      StateLayers.light[StateLayersVariant.onSurface];
    return {
      containerStyle: {
        borderColor: layerColor,
        borderWidth: 0.5,
        backgroundColor: 'transparent',
      },
      contentStyle: {color: textColor},
      componentStyle: {opacity: textColor},
    };
  }

  if (selected) {
    const {container: containerColor, onContainer: onContainerColor} =
      Color.light[ColorVariant.secondary];
    const layerColor =
      StateLayers.light[StateLayersVariant.secondaryContainer]?.level_088;
    return {
      containerStyle: {
        backgroundColor: pressed ? layerColor : containerColor,
      },
      contentStyle: {
        color: onContainerColor,
      },
    };
  } else {
    const onSurfaceVar = Color.light[ColorVariant.surfaceVariant]?.onBase;
    const surface = Color.light[ColorVariant.surface]?.base;
    const layerColor =
      StateLayers.light[StateLayersVariant.surfaceVar]?.level_012;
    const outlineColor = Color.light[ColorVariant.outline]?.base;

    return {
      containerStyle: {
        backgroundColor: pressed ? layerColor : surface,
        borderColor: outlineColor,
        borderWidth: 0.5,
      },
      contentStyle: {color: onSurfaceVar},
    };
  }
}

export default function BaseChip(props) {
  const {
    content,
    LeftComponent,
    RightComponent,
    children,
    style,
    contentStyle: rawContentStyle,
    typographyVariant = Typography.label.large,
    selected = false,
    disabled,
    ...otherProps
  } = props;

  function getContainerStyle({pressed}) {
    return [
      defaultChipStyle.container,
      generateStateStyles(selected, pressed, disabled)?.containerStyle,
      style,
    ];
  }

  function renderContent({pressed}) {
    const stateContentStyle = generateStateStyles(
      selected,
      pressed,
      disabled,
    )?.contentStyle;
    const contentStyle = [
      typographyVariant,
      stateContentStyle,
      rawContentStyle,
    ];
    return (
      <>
        {children}
        {LeftComponent}
        {content && <Text style={contentStyle}>{content}</Text>}
        {RightComponent}
      </>
    );
  }

  return (
    <Pressable {...otherProps} style={getContainerStyle}>
      {renderContent}
    </Pressable>
  );
}
