import {FilledButton, OutlinedButton} from '../buttons';
import {View} from 'react-native';
import React from 'react';
import {ParagraphContent} from '../content';
import useCardStyle from './cardStyles';
import {Color} from '../../themes';
import {ColorVariant} from '../../themes/color';
import TextButton from '../buttons/TextButton';

export default function GameCards(props) {
  const cardStyle = useCardStyle.gameCard;
  const {colorSurfaceVariant = ColorVariant.surfaceVariant, ...otherProps} =
    props;
  const {base: cardBase} = Color.light[colorSurfaceVariant];
  const {container, headline, content, button} = cardStyle;

  const containerStyle = [{backgroundColor: cardBase}, container];
  const mainContentStyle = [content];
  const buttonLayoutStyle = [button];
  const handlePressFilledButton = () => {
    alert('move to new card');
  };
  const handlePressOutlinedButton = () => {
    alert('move to previous card');
  };

  return (
    <View {...otherProps} style={containerStyle}>
      <View style={mainContentStyle}>
        <ParagraphContent />
      </View>
      <View style={buttonLayoutStyle}>
        <FilledButton content={'Lá khác'} onPress={handlePressFilledButton} />
        <TextButton content={'Lá trước'} onPress={handlePressOutlinedButton} />
      </View>
    </View>
  );
}
