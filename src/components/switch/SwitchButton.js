import React, {useState} from 'react';
import {Switch} from 'react-native';
import {Color, ColorVariant} from 'src/themes';

export default function SwitchButton(props) {
  const {
    selected,
    disabled,
    onTogglePressed = () => {},
    style,
    ...otherProps
  } = props;
  const [isEnabled, setIsEnabled] = useState(false);
  const {base: baseColor, onBase: onBaseColor} =
    Color.light[ColorVariant.primary];
  const surfaceVarColor = Color.light[ColorVariant.surfaceVariant]?.base;
  const outlineColor = Color.light[ColorVariant.outline]?.base;

  function toggleSwitch() {
    setIsEnabled(previousState => !previousState);
    onTogglePressed();
  }

  const switchProps = {
    trackColor: {false: surfaceVarColor, true: baseColor},
    thumbColor: isEnabled ? onBaseColor : outlineColor,
  };
  return (
    <Switch
      {...otherProps}
      {...switchProps}
      style={style}
      disabled={disabled}
      onValueChange={toggleSwitch}
      value={isEnabled}
    />
  );
}
