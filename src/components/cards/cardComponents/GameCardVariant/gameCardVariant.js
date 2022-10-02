import React from 'react';
import {ParagraphContent} from '../../../content';
import {Elevation3} from '../../../elevations/Elevation';
import {ColorVariant} from 'src/themes';
import {Color} from '../../../../themes';
import gameCardStyle from './gameCardStyle';

function GameCardBase(props) {
  const {
    style,
    children,
    colorSurfaceVariant = ColorVariant.surfaceVariant,
  } = props;
  const {base: baseColor} = Color.light[colorSurfaceVariant];
  const elevationStyle = [
    gameCardStyle.container,
    {backgroundColor: baseColor},
    style,
  ];
  return <Elevation3 containerStyle={elevationStyle}>{children}</Elevation3>;
}

function LargeGameCard(props) {
  const {contentStyle, style} = props;
  const questionDemo =
    'Để có được 10 đồng tiền vàng, một ông lão đã phải nhảy xuống biển nhặt nó. Vậy hỏi đồng tiền vàng đó nặng bao nhiêu?';
  const cardStyle = [gameCardStyle.size.large, style];
  const contentStyles = [contentStyle, gameCardStyle.contentStyle];
  return (
    <GameCardBase style={cardStyle}>
      <ParagraphContent content={questionDemo} contentStyle={contentStyles} />
    </GameCardBase>
  );
}

function MediumGameCard(props) {
  const {contentStyle, style} = props;
  const questionDemo =
    'Để có được 10 đồng tiền vàng, một ông lão đã phải nhảy xuống biển nhặt nó. Vậy hỏi đồng tiền vàng đó nặng bao nhiêu?';
  const cardStyle = [gameCardStyle.size.medium, style];
  const contentStyles = [contentStyle, gameCardStyle.contentStyle];
  return (
    <GameCardBase style={cardStyle}>
      <ParagraphContent content={questionDemo} contentStyle={contentStyles} />
    </GameCardBase>
  );
}

export {MediumGameCard, LargeGameCard};
