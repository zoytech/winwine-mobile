import React, {useEffect, useLayoutEffect} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import {Color, ColorVariant} from 'src/themes';
import avatarTest from 'src/assets/images/preview-package/user.png';
import {CenterTopBar} from 'src/components';

export default function BlankScreen({navigation}) {
  useEffect(() => {
    navigation.setOptions({
      header: () => (
        <CenterTopBar
          content={'Good morning'}
          headerTitleStyle={styles.headerTitle}
          trailingIcon={avatarTest}
          onTrailingIconPress={() => alert('test leading button')}
        />
      ),
    });
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={{width: 300, aspectRatio: 2, backgroundColor: 'green'}} />
        <View style={{width: 300, aspectRatio: 2, backgroundColor: 'black'}} />

        <View style={{width: 300, aspectRatio: 2, backgroundColor: 'coral'}} />
        <View style={{width: 300, aspectRatio: 2, backgroundColor: 'lime'}} />
        <View style={{width: 300, aspectRatio: 2, backgroundColor: 'yellow'}} />
        <View
          style={{width: 300, aspectRatio: 2, backgroundColor: 'lightblue'}}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: Color.light[ColorVariant.background].base,
  },
  headerTitle: {
    justifyContent: 'flex-start',
  },
});
