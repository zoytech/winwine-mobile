import React from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';

import {
  Color,
  ColorVariant,
  StateLayers,
  StateLayersVariant,
  Typography,
} from 'src/themes';

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
    const layerColor =
      StateLayers.light[StateLayersVariant.surfaceVar]?.level_012;
    const outlineColor = Color.light[ColorVariant.outline]?.base;

    return {
      containerStyle: {
        backgroundColor: pressed ? layerColor : 'transparent',
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
      styles.container,
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
    return (
      <>
        {children}
        {LeftComponent}
        {content && (
          <Text style={[typographyVariant, stateContentStyle, rawContentStyle]}>
            {content}
          </Text>
        )}
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

const styles = StyleSheet.create({
  container: {
    height: 32,
    borderRadius: 8,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  stateLayerView: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'red',
  },
  icon: {
    paddingHorizontal: 8,
    width: 18,
    height: 18,
  },
});
