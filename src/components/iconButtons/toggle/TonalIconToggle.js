import React, {useState} from 'react';
import {Text} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {Color, ColorVariant, StateLayers, StateLayersVariant} from 'src/themes';
import {BaseButton} from 'src/components';
import DefaultIconButtonStyle from './defaultIconButtonStyle';

function getStateStyles({pressed, disabled, selected}) {
  if (disabled) {
    const {level_012: layerColor, level_038: textColor} =
      StateLayers.light[StateLayersVariant.onSurface];
    return {
      containerStyle: {
        backgroundColor: layerColor,
      },
      contentStyle: {color: textColor},
      iconColor: textColor,
    };
  }
  const {base: baseColor, onBase: onBaseColor} =
    Color.light[ColorVariant.surfaceVariant];
  const secondStateLayer =
    StateLayers.light[StateLayersVariant.secondaryContainer]?.level_088;
  const surVarStateLayer =
    StateLayers.light[StateLayersVariant.surfaceVar]?.level_088;
  if (selected) {
    const {container: containerColor, onContainer: onContainerColor} =
      Color.light[ColorVariant.secondary];
    return {
      containerStyle: {
        backgroundColor: pressed ? secondStateLayer : containerColor,
      },
      contentStyle: {color: onContainerColor},
      iconColor: onContainerColor,
    };
  }
  return {
    containerStyle: {
      backgroundColor: pressed ? surVarStateLayer : baseColor,
    },
    contentStyle: {color: onBaseColor},
    iconColor: onBaseColor,
  };
}

export default function TonalIconToggle(props) {
  const {
    content,
    style,
    contentStyle: rawContentStyle,
    iconStyle,
    name,
    selectedName,
    disabled = false,
    children,
    ...otherProps
  } = props;

  const [selected, setSelected] = useState(false);

  function getContainerStyle({pressed}) {
    return [
      DefaultIconButtonStyle.container,
      getStateStyles({
        pressed,
        disabled,
        selected,
      })?.containerStyle,
      style,
    ];
  }

  function handleButtonToggle() {
    setSelected(!selected);
  }

  function renderContent({pressed}) {
    const {contentStyle, iconColor} = getStateStyles({
      pressed,
      disabled,
      selected,
    });
    const iconProps = {
      size: DefaultIconButtonStyle.icon.size,
      name: selectedName && selected ? selectedName : name,
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
    <BaseButton
      {...otherProps}
      onPressOut={handleButtonToggle}
      disabled={disabled}
      style={getContainerStyle}>
      {renderContent}
    </BaseButton>
  );
}
