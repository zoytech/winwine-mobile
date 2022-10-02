import React from 'react';
import {Dimensions, SafeAreaView, StyleSheet} from 'react-native';
import GamePackageItem from '../../components/cards/cardVariant/GamePackageItem';
import {OutlinedButton} from '../../components';
import TextButton from '../../components/buttons/TextButton';
import CardBase from '../../components/cards/cardVariant/CardBase';
import EndGameCard from '../../components/cards/cardVariant/EndGameCard';
import MainGameCard from '../../components/cards/cardVariant/MainGameCard';
import ReviewGameCard from '../../components/cards/cardVariant/ReviewGameCard';
import SuggestionChipBase from '../../components/chips/SuggestionChips';

export default function HomeScreen() {
  const screenStyle = [styles.container];
  return (
    <SafeAreaView style={screenStyle}>
      <GamePackageItem />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    // alignSelf: 'center',
    // textAlign: 'center',
    // textAlignVertical: 'center',
  },
  square: {
    width: 200,
    height: 200,
    margin: 30,
    backgroundColor: 'rgba(132, 84, 0, 0.5)',
    shadowColor: 'rgba(0, 0, 0, 0.15)',
    elevation: 1,

    // shadowColor: '#000',
    // shadowOffset: {width: 0, height: 2},
    // shadowOpacity: 0.5,
    // shadowRadius: 2,
  },
});

/*
 <View style={screenView}>
          <View style={labelSelectionStyle}></View>
          <View style={title1Style}></View>
          <View style={stackCardsRowStyle}></View>
          <View style={title2Style}></View>
      </View>
      <ScrollView style={stackCardsColumnStyle}>
      </ScrollView>
 */

/*
  screenView: {
      display: 'flex',
      flex: 1
  },
  labelSelection: {
      flex: 2,
      backgroundColor: 'blue',
  },
  title1: {
      flex: 1,
      backgroundColor: 'deeppink',

  },
  stackCardsRow: {
      flex: 4,
      backgroundColor: 'chocolate',

  },
  title2: {
      flex: 1,
      backgroundColor: 'green',
  },
  stackCardsScroll: {
      flex: 1,
      backgroundColor: 'black',

  }
 */

/*
 const labelSelectionStyle = [styles.labelSelection]
  const title1Style = [styles.title1]
  const stackCardsRowStyle = [styles.stackCardsRow]
  const title2Style = [styles.title2]
  const screenView = [styles.screenView]
  const stackCardsColumnStyle = [styles.stackCardsScroll]
 */
