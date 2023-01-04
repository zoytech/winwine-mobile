import React from 'react';
import {Text} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {Color, ColorVariant, StateLayers, StateLayersVariant} from 'src/themes';
import {BaseButton} from 'src/components';
import DefaultIconButtonStyle from './defaultIconButtonStyle';

function getStateStyles({pressed, disabled}) {
  if (disabled) {
    const {level_038, level_012} =
      StateLayers.light[StateLayersVariant.onSurface];
    return {
      containerStyle: {backgroundColor: level_012},
      contentStyle: {color: level_038},
      iconColor: level_038,
    };
  }
  const {container: containerColor, onContainer: onContainerColor} =
    Color.light[ColorVariant.secondary];
  const stateLayer =
    StateLayers.light[StateLayersVariant.secondaryContainer]?.level_088;
  return {
    containerStyle: {backgroundColor: pressed ? stateLayer : containerColor},
    contentStyle: {color: onContainerColor},
    iconColor: onContainerColor,
  };
}

export default function TonalIconButton(props) {
  const {
    content,
    style,
    contentStyle: rawContentStyle,
    iconStyle,
    name,
    disabled,
    children,
    ...otherProps
  } = props;

  function getContainerStyle({pressed}) {
    return [
      DefaultIconButtonStyle.container,
      getStateStyles({pressed, disabled})?.containerStyle,
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
