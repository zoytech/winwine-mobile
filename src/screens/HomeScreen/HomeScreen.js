import React from 'react';
import {View, StyleSheet, Pressable, Text} from 'react-native';
import {FilledButton} from '../../components';

import {ColorVariant} from '../../themes/color';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <FilledButton colorVariant={ColorVariant.primary} content={'test'} />
      <Pressable style={{backgroundColor: 'blue'}} onPress={() => {}}>
        <Text>I'm pressable!</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
  },
});
