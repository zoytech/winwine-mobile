import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {TouchableHighlight} from '@gorhom/bottom-sheet';
import {Color, ColorVariant, StateLayers, StateLayersVariant} from 'src/themes';
import {HEIGHT} from 'src/constants';

function getStateStyles(disabled) {
  if (disabled) {
    const level_038 =
      StateLayers.light[StateLayersVariant.onSurface]?.level_038;
    return {
      containerStyle: {
        backgroundColor: 'transparent',
      },
      contentStyle: {color: level_038},
      iconColor: level_038,
    };
  }
  const onBaseColor = Color.light[ColorVariant.surfaceVariant]?.onBase;

  return {
    containerStyle: {
      backgroundColor: 'transparent',
    },
    contentStyle: {color: onBaseColor},
    iconColor: onBaseColor,
  };
}

export default function BottomSheetStandardButton(props) {
  const {
    content,
    style,
    contentStyle: rawContentStyle,
    iconStyle,
    icon,
    disabled,
    isFab,
    ...otherProps
  } = props;

  const layerColor =
    StateLayers.light[StateLayersVariant.onSurfaceVar]?.level_012;

  const containerStyle = [
    styles.fabContainer,
    getStateStyles(disabled)?.containerStyle,
    style,
  ];
  const fabPositionStyle = isFab && styles.fabPosition;

  const {contentStyle, iconColor} = getStateStyles(disabled);
  const iconProps = {
    name: icon,
    color: iconColor,
    size: 16,
    ...iconStyle,
  };

  return (
    <View style={fabPositionStyle}>
      <TouchableHighlight
        {...otherProps}
        disabled={!!disabled}
        underlayColor={layerColor}
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
    left: 88,
    top: 1,
  },
});
