import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {Color, ColorVariant} from 'src/themes';
import avatarTest from 'src/assets/images/preview-package/user.png';
import {CenterAlignedTopBar} from 'src/components';

export default function HomeScreen({navigation}) {
  useEffect(() => {
    navigation.setOptions({
      header: () => (
        <CenterAlignedTopBar
          content={'Good morning'}
          headerTitleStyle={styles.headerTitle}
          trailingIcon={avatarTest}
          onTrailingIconPress={() => alert('test leading button')}
        />
      ),
    });
  }, [navigation]);

  return <SafeAreaView style={styles.container} />;
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: Color.light[ColorVariant.background].base,
  },
  headerTitle: {
    justifyContent: 'flex-start',
  },
});
