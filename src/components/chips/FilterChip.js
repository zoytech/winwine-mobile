import React from 'react';
import BaseChip from './BaseChip';
import {StandardIconButton} from '../iconButtons';
import defaultChipStyle from './defaultChipStyle';

export default function FilterChip(props) {
  const {icon, iconStyle, img, imgStyle, style, selected, ...otherProps} =
    props;

  function renderRightComponent() {
    const iconProps = {
      name: icon ? icon : 'close',
      size: 18,
      ...iconStyle,
    };
    const {iconContainer, rightComponent} = defaultChipStyle;

    return (
      <>
        {icon && (
          <StandardIconButton
            iconStyle={iconProps}
            style={[iconContainer, rightComponent]}
          />
        )}
      </>
    );
  }

  function renderLeftComponent() {
    const iconProps = {
      name: selected && 'check',
      size: 18,
    };
    const {iconContainer, leftComponent} = defaultChipStyle;
    return (
      <>
        {selected && (
          <StandardIconButton
            iconStyle={iconProps}
            style={[iconContainer, leftComponent]}
          />
        )}
      </>
    );
  }

  return (
    <BaseChip
      {...otherProps}
      style={style}
      RightComponent={renderRightComponent()}
      LeftComponent={renderLeftComponent()}
      selected={selected}
    />
  );
}
