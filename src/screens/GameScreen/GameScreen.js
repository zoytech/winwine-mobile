import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {
  FilledButton,
  HeadlineBase,
  HeadlineInfo,
  LargeGameCard,
  MonoGram,
  OutlinedButton,
} from '../../components';

import {ColorVariant} from '../../themes/color';
import {Color, Typography} from '../../themes';
import {gameCardLayout} from './layoutScreen';
import {
  Header,
  SubHeader,
} from '../../components/cards/cardComponents/Headline';

export default function GameScreen(props) {
  return <SafeAreaView style={screenStyle} />;
}

const styles = StyleSheet.create({
  content: {
    alignSelf: 'center',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});
const cardInfo = {
  id: '123',
  title: 'Bai cua Nam',
  tag: 'Thieu nhi',
  totalCards: '30',
  avatar: 'N',
  currentCard: '28',
};
