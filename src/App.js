import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <View style={styles.content} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  content: {
    flex: 1,
    backgroundColor: 'red',
  },
});
