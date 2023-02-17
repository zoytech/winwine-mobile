import React from 'react';
import {Color, ColorVariant} from '../../themes';
import Icon from 'react-native-vector-icons/AntDesign';
import BaseChip from './BaseChip';
import {StandardIconButton} from '../iconButtons';
import defaultChipStyle from './defaultChipStyle';
import {Image, View} from 'react-native';

export default function FilterChip(props) {
  const {
    icon,
    image,
    iconStyle,
    imageStyle,
    style,
    selected = false,
    hasTrailingIcon = false,
    onTrailingIconPress = () => {},
    ...otherProps
  } = props;
  const primary = Color.light[ColorVariant.primary]?.base;
  const {leftComponent, rightComponent, avatar, iconButton} = defaultChipStyle;
  const containerStyle = [
    {paddingRight: hasTrailingIcon === true ? 0 : 12},
    style,
  ];

  function renderRightComponent() {
    const iconContainerStyle = [iconButton];
    const iconProps = {
      name: 'caretdown',
      size: 12,
      color: primary,
      style: rightComponent,
      ...iconStyle,
    };
    if (hasTrailingIcon && hasTrailingIcon === true) {
      return (
        <StandardIconButton
          onPress={onTrailingIconPress}
          style={iconContainerStyle}
          iconStyle={iconProps}
        />
      );
    }
    return null;
  }

  function renderLeftComponent() {
    const defaultAvatarStyle = [avatar, imageStyle];
    const iconProps = {
      size: 18,
      color: primary,
      ...iconStyle,
    };
    if (selected && selected === true) {
      return <Icon name={'check'} {...iconProps} style={leftComponent} />;
    }
    if (icon) {
      return <Icon name={icon} {...iconProps} style={leftComponent} />;
    }
    if (image) {
      return (
        <View style={leftComponent}>
          <Image source={image} style={defaultAvatarStyle} />
        </View>
      );
    }
    return null;
  }

  return (
    <BaseChip
      {...otherProps}
      style={containerStyle}
      RightComponent={renderRightComponent()}
      LeftComponent={renderLeftComponent()}
      selected={selected}
    />
  );
}
