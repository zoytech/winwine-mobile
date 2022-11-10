import React from 'react';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {Color, ColorVariant, StateLayers, StateLayersVariant} from 'src/themes';
import {BaseButton} from 'src/components';
import DefaultIconButtonStyle from './defaultIconButtonStyle';

function getStateStyles(isPressed, isDisabled, colorVariant) {
  if (isDisabled) {
    const {level_038, level_012} =
      StateLayers.light[StateLayersVariant.onSurface];
    return {
      containerStyle: {
        backgroundColor: 'transparent',
        borderColor: level_012,
        borderWidth: 0.5,
      },
      contentStyle: {color: level_038},
      iconColor: level_038,
    };
  }
  const {onBase: onBaseColor} = Color.light[colorVariant];
  const {base: baseOutlineColor} = Color.light[ColorVariant.outline];
  if (isPressed) {
    const layerColor = StateLayers.light[StateLayersVariant.outline]?.level_088;
    return {
      containerStyle: {
        backgroundColor: layerColor,
        borderColor: baseOutlineColor,
        borderWidth: 0.5,
      },
      contentStyle: {color: onBaseColor},
      iconColor: onBaseColor,
    };
  }
  return {
    containerStyle: {
      backgroundColor: 'transparent',
      borderColor: baseOutlineColor,
      borderWidth: 0.5,
    },
    contentStyle: {color: onBaseColor},
    iconColor: onBaseColor,
  };
}

export default function OutlinedIconButton(props) {
  const {
    content,
    style,
    contentStyle: rawContentStyle,
    iconStyle,
    name,
    colorVariant = ColorVariant.surface,
    disabled,
    children,
    ...otherProps
  } = props;

  function getContainerStyle({pressed}) {
    return [
      DefaultIconButtonStyle.container,
      getStateStyles(pressed, disabled, colorVariant)?.containerStyle,
      style,
    ];
  }

  function renderContent({pressed}) {
    const {contentStyle, iconColor} = getStateStyles(
      pressed,
      disabled,
      colorVariant,
    );
    const iconProps = {
      size: DefaultIconButtonStyle.icon.size,
      name: name,
      color: iconColor,
    };
    return (
      <>
        <Icon {...iconProps} />
        {content && <View style={contentStyle}>{content}</View>}
      </>
    );
  }

  return (
    <BaseButton {...otherProps} style={getContainerStyle}>
      {renderContent}
    </BaseButton>
  );
}
