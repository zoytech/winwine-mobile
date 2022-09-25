import React from 'react';
import {Dimensions, SafeAreaView, StyleSheet} from 'react-native';
import {GameCards} from '../../components';

import {ColorVariant} from '../../themes/color';
import {Color} from '../../themes';

export default function GameScreen() {
  const {base} = Color.light[ColorVariant.surface];
  const screenStyle = [styles.container, {backgroundColor: base}];
  return (
    <SafeAreaView style={screenStyle}>
      <GameCards />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

// const Content = "Bạn đã bao giờ yêu cùng lúc hai người chưa? Lúc đó câu chuyện diễn tiến thế nào?";
