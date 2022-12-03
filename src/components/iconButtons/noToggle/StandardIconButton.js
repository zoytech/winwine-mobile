import React from 'react';
import {Text} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {Color, ColorVariant, StateLayers, StateLayersVariant} from 'src/themes';
import {BaseButton} from 'src/components';
import DefaultIconButtonStyle from './defaultIconButtonStyle';

function getStateStyles({pressed, disabled}) {
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
  const layerColor =
    StateLayers.light[StateLayersVariant.onSurfaceVar]?.level_012;
  return {
    containerStyle: {
      backgroundColor: pressed ? layerColor : 'transparent',
    },
    contentStyle: {color: onBaseColor},
    iconColor: onBaseColor,
  };
}

export default function StandardIconButton(props) {
  const {
    content,
    style,
    contentStyle: rawContentStyle,
    iconStyle,
    name,
    disabled,
    selected,
    children,
    ...otherProps
  } = props;

  function getContainerStyle({pressed}) {
    return [
      DefaultIconButtonStyle.container,
      getStateStyles({
        pressed,
        disabled,
      })?.containerStyle,
      style,
    ];
  }

  function renderContent({pressed}) {
    const {contentStyle, iconColor} = getStateStyles({
      pressed,
      disabled,
    });
    const iconProps = {
      size: DefaultIconButtonStyle.icon.size,
      name: name,
      color: iconColor,
      ...iconStyle,
    };
    const contentStyles = [contentStyle, rawContentStyle];
    return (
      <>
        <Icon {...iconProps} />
        {content && <Text style={contentStyles}>{content}</Text>}
      </>
    );
  }

  return (
    <BaseButton {...otherProps} style={getContainerStyle}>
      {renderContent}
    </BaseButton>
  );
}
