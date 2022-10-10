import React from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';

import {Color, ColorVariant, Typography} from 'src/themes';

const ChipVariant = {
  OUTLINED: 'OUTLINED',
  ELEVATED: 'ELEVATED',
};

function generateStateStyles(
  selected,
  pressed,
  disabled,
  selectedColorVariant,
  colorVariant,
) {
  if (disabled) {
    const {base: baseColor, onBase: onBaseColor} =
      Color.light[ColorVariant.surface];
    return {
      containerStyle: {backgroundColor: baseColor, opacity: 0.5},
      contentStyle: {color: onBaseColor},
    };
  }

  if (selected) {
    const {container: containerColor, onContainer: onContainerColor} =
      Color.light[selectedColorVariant];
    if (pressed) {
      return {
        containerStyle: {backgroundColor: containerColor},
        contentStyle: {color: onContainerColor},
      };
    }
    return {
      containerStyle: {backgroundColor: containerColor},
      contentStyle: {color: onContainerColor},
    };
  } else {
    const {base: baseColor, onBase: onBaseColor} = Color.light[colorVariant];
    if (pressed) {
      return {
        containerStyle: {backgroundColor: baseColor},
        contentStyle: {color: onBaseColor},
      };
    }
    return {
      containerStyle: {backgroundColor: baseColor},
      contentStyle: {color: onBaseColor},
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

    selectedColorVariant = ColorVariant.secondary,
    colorVariant = ColorVariant.surfaceVariant,
    chipVariant = ChipVariant.ELEVATED,
    typographyVariant = Typography.label.large,

    selected = false,
    disabled,
    ...otherProps
  } = props;

  function getContainerStyle({pressed}) {
    return [
      styles.container,
      generateStateStyles(
        selected,
        pressed,
        disabled,
        selectedColorVariant,
        colorVariant,
      )?.containerStyle,
      style,
    ];
  }

  function renderContent({pressed}) {
    const stateContentStyle = generateStateStyles(
      selected,
      pressed,
      disabled,
      selectedColorVariant,
      colorVariant,
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
