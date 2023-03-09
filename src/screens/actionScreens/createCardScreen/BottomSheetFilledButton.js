import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {TouchableHighlight} from '@gorhom/bottom-sheet';
import {Color, ColorVariant, StateLayers, StateLayersVariant} from 'src/themes';
import {HEIGHT} from 'src/constants';

function getStateStyles(disabled) {
  if (disabled) {
    const {level_038, level_012} =
      StateLayers.light[StateLayersVariant.onSurface];
    return {
      containerStyle: {backgroundColor: level_012},
      contentStyle: {color: level_038},
      iconColor: level_038,
    };
  }
  const {onBase: onBaseColor, base: baseColor} =
    Color.light[ColorVariant.primary];
  return {
    containerStyle: {backgroundColor: baseColor},
    contentStyle: {color: onBaseColor},
    iconColor: onBaseColor,
  };
}

export default function BottomSheetFilledButton(props) {
  const {
    content,
    style,
    contentStyle: rawContentStyle,
    iconStyle,
    icon,
    disabled,
    ...otherProps
  } = props;

  const stateLayerColor =
    StateLayers.light[StateLayersVariant.primary]?.level_088;

  const containerStyle = [
    styles.fabContainer,
    getStateStyles(disabled)?.containerStyle,
    style,
  ];

  const {contentStyle, iconColor} = getStateStyles(disabled);
  const iconProps = {
    name: icon,
    color: iconColor,
    size: 44 / 2,
    ...styles.fabIcon,
    ...iconStyle,
  };

  return (
    <View style={styles.fabPosition}>
      <TouchableHighlight
        {...otherProps}
        disabled={!!disabled}
        underlayColor={stateLayerColor}
        style={containerStyle}>
        <>
          <Icon {...iconProps} />
          {content && (
            <Text style={[contentStyle, rawContentStyle]}>{content}</Text>
          )}
        </>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  fabContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  fabPosition: {
    position: 'absolute',
    right: 34,
    bottom: 32 + HEIGHT.BOTTOM_BAR,
  },
});
