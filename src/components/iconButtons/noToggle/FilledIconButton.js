import React from 'react';
import {Text} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {Color, ColorVariant, StateLayers, StateLayersVariant} from 'src/themes';
import {BaseButton} from 'src/components';
import DefaultIconButtonStyle from './defaultIconButtonStyle';

function getStateStyles(isPressed, isDisabled, colorVariant) {
  if (isDisabled) {
    const {level_012, level_032} =
      StateLayers.light[StateLayersVariant.onSurface];
    return {
      containerStyle: {backgroundColor: level_012},
      contentStyle: {color: level_032},
      iconColor: level_032,
    };
  }
  const {onBase: onBaseColor, base: baseColor} = Color.light[colorVariant];
  if (isPressed) {
    const level_012 =
      StateLayers.light[StateLayersVariant.onPrimary]?.level_012;
    return {
      containerStyle: {backgroundColor: level_012},
      contentStyle: {color: onBaseColor},
      iconColor: onBaseColor,
    };
  }
  return {
    containerStyle: {backgroundColor: baseColor},
    contentStyle: {color: onBaseColor},
    iconColor: onBaseColor,
  };
}

export default function FilledIconButton(props) {
  const {
    content,
    style,
    contentStyle: rawContentStyle,
    iconStyle,
    name,
    colorVariant = ColorVariant.primary,
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
      ...iconStyle,
    };
    return (
      <>
        <Icon {...iconProps} />
        {content && (
          <Text style={[contentStyle, rawContentStyle]}>{content}</Text>
        )}
      </>
    );
  }

  return (
    <BaseButton {...otherProps} style={getContainerStyle}>
      {renderContent}
    </BaseButton>
  );
}
