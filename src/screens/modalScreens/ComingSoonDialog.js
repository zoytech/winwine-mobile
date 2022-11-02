import {useState} from 'react';
import {StyleSheet} from 'react-native';
import {BasicDialog} from 'src/components';
import {Color, ColorVariant} from 'src/themes';
import {ScreenKeys} from 'src/navigations/ScreenKeys';

export default function ComingSoonDialog({route, navigation}) {
  function handleMainActionPress() {
    // navigation.navigator({
    //   name: ScreenKeys.HOME,
    //   params: {isSelected: setIsSelected(!isSelected)},
    //   merge: true,
    // });
    navigation.goBack();
  }

  return (
    <BasicDialog
      icon={'infocirlce'}
      headline={'Coming soon'}
      supportingText={
        'Our exciting new feature is coming soon! Check back later.'
      }
      mainAction={'OK'}
      onMainActionPress={handleMainActionPress}
    />
  );
}

const styles = StyleSheet.create({
  layout: {
    backgroundColor: Color.light[ColorVariant.background].base,
  },
});
