import React from 'react';
import {FlatList, SafeAreaView, StyleSheet, Text, TextInput, View} from 'react-native';
import {useSelector} from 'react-redux';
import {Color, ColorVariant} from 'src/themes';
import {SpinnerType1} from 'src/components';
import {requestingDeckSelector} from 'src/redux/selectors';
import {widthOf} from 'src/constants';
import {CustomStatusBar} from 'src/screens/components';

const width = {
  CONTAINER: 320,
  CARD: 320 * 0.85,
  SEPARATOR: 10,
};

export default function CreateDeckScreen({navigation, route}) {
  const requesting = useSelector(requestingDeckSelector);
  const baseColor = Color.light[ColorVariant.surface]?.base;
  const textColor = Color.light[ColorVariant.surfaceVariant]?.onBase;

  const defaultContainerStyle = [
    {backgroundColor: baseColor},
    styles.container,
  ];

  function renderImageField() {
    return <View style={styles.image} />;
  }

  function renderTitleDeckField() {
    return (
      <>
        <View>
          <Text>{'Nhâp tên bộ bài của bạn'}</Text>
        </View>
        <View>
          <TextInput />
        </View>
      </>
    );
  }

  function renderChipSelection() {
    return (
        <FlatList data={} renderItem={}
    )
  }

  if (requesting) {
    return <SpinnerType1 />;
  }
  return (
    <SafeAreaView style={defaultContainerStyle}>
      <CustomStatusBar />
      <View style={styles.media}>{renderImageField()}</View>
      <View style={styles.titleDeck}>{renderTitleDeckField()}</View>
      <View style={styles.chipSelection}>{renderChipSelection()}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: widthOf?.SCREEN,
  },
  scrollView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  media: {
    aspectRatio: 2,
    justifyContent: 'center',
    backgroundColor: 'coral',
  },
  image: {
    width: 200,
    height: 200,
    backgroundColor: 'violet',
  },
  titleDeck: {
    aspectRatio: 3,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    backgroundColor: 'green',
  },
  chipSelection: {
    aspectRatio: 7,
    justifyContent: 'center',
    backgroundColor: 'pink',
  },
  button: {
    width: 200,
    height: 50,
    borderRadius: 20,
  },
  buttonContent: {
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  headerButtonIcon: {
    borderRadius: 0,
    minWidth: 48,
    minHeight: 48,
  },
});
