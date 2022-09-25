import {FilledButton, UnfilledButtons} from '../buttons';
import {View} from 'react-native';
import React from 'react';
import {GameScript} from '../content';
import useCardStyle from './cardStyles';
import {Color} from '../../themes';
import {ColorVariant} from '../../themes/color';

export default function GameCardItem(props) {
  const cardStyle = useCardStyle.gameCard;
  const {colorSurfaceVariant = ColorVariant.surfaceVariant, ...otherProps} =
    props;
  const {base: cardBase} = Color.light[colorSurfaceVariant];
  const {container, headline, content, button} = cardStyle;

  const containerStyle = [{backgroundColor: cardBase}, container];
  const mainContentStyle = [content];
  const buttonLayoutStyle = [button];

  return (
    <View {...otherProps} style={containerStyle}>
      <View style={mainContentStyle}>
        <GameScript />
      </View>

      <View style={buttonLayoutStyle}>
        <FilledButton content={'Kế tiếp'} message={'Chuyen qua la tiep theo'} />
        <UnfilledButtons content={'Lá trước'} message={'Xem lại lá trước'} />
      </View>
    </View>
  );
}


