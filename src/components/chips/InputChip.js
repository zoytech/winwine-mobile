import React from 'react';
import BaseChip from './BaseChip';
import {StandardIconButton} from '../iconButtons';
import defaultChipStyle from './defaultChipStyle';

export default function InputChip(props) {
  const {icon, iconStyle, img, imgStyle, style, ...otherProps} = props;

  function renderRightComponent() {
    const iconProps = {
      name: icon ? icon : 'close',
      size: 18,
      ...iconStyle,
    };
    const {iconContainer, rightComponent} = defaultChipStyle;

    return (
      <StandardIconButton
        iconStyle={iconProps}
        style={[iconContainer, rightComponent]}
      />
    );
  }

  return (
    <BaseChip
      {...otherProps}
      style={style}
      RightComponent={renderRightComponent()}
    />
  );
}
