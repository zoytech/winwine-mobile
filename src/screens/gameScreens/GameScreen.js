import React from 'react';
import {StyleSheet, View} from 'react-native';
import ElevatedCard from '../../components/cards/ElevatedCard';

export default function GameScreen() {
  return (
    <View style={styles.container}>
      <ElevatedCard />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: 'red',
  },
});
