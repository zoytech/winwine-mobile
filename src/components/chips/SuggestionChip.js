import React from 'react';
import BaseChip from './BaseChip';

export default function SuggestionChip(props) {
  const {style, ...otherProps} = props;
  return <BaseChip {...otherProps} style={style} />;
}
