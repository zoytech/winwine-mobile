import React from 'react';
import {ParagraphContent} from '../content';
import {gameCard} from './cardStyles';
import {Elevation3} from '../elevations/Elevation';
import {ColorVariant} from '../../themes/color';
import {Color} from '../../themes';

export default function GameCard(props) {
  const {
    colorSurfaceVariant = ColorVariant.surfaceVariant,
    contentStyle,
    style,
  } = props;
  const {base} = Color.light[colorSurfaceVariant];
  const elevationStyle = [
    gameCard.base,
    gameCard.size.large,
    {backgroundColor: base},
    style,
  ];
  const questionDemo =
    'Để có được 10 đồng tiền vàng, một ông lão đã phải nhảy xuống biển nhặt nó. Vậy hỏi đồng tiền vàng đó nặng bao nhiêu?';

  return (
    <Elevation3 containerStyle={elevationStyle}>
      <ParagraphContent content={questionDemo} contentStyle={contentStyle} />
    </Elevation3>
  );
}
