import React from 'react';
import {
  Dimensions,
  FlatList,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import MiniCardItem from './components/MiniCardItem/MiniCardItem';
import {PrimaryChip, SecondaryChip} from '../../components';
import {Typography} from '../../themes';

const {width: screenWidth, height: screenHeight} = Dimensions.get('screen');

export default function HomeScreen(props) {
  const {typoChip = Typography.label.large} = props;
  const screenStyle = [styles.container];

  const renderPackageItem = ({item}) => <MiniCardItem cardInfo={item} />;
  return (
    <SafeAreaView style={screenStyle}>
      <View style={styles.chip}>
        <SecondaryChip
          content={'Drinking game'}
          contentStyle={typoChip}
          containerStyle={styles.shadow}
        />
        <PrimaryChip
          content={'Truth or dare'}
          contentStyle={typoChip}
          containerStyle={styles.shadow}
        />
      </View>
      <FlatList
        data={CARD_DATA}
        renderItem={renderPackageItem}
        keyExtractor={item => item?.id}
        horizontal={true}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: screenWidth,
  },
  chip: {
    flexDirection: 'row',
  },
  shadow: {
    margin: 16,
  },
});

const NameOfGame = [
  {
    id: '1',
    name: 'Drinking game',
  },
  {
    id: '2',
    name: 'Truth or dare',
  },
];

const CARD_DATA = [
  {
    id: '123',
    title: 'Bai cua Nam',
    tag: 'Thieu nhi',
    totalCards: '30',
    avatar: 'N',
    currentCard: '28',
  },
  {
    id: '124',
    title: 'Bai cua Tu',
    tag: '18+',
    totalCards: '30',
    avatar: 'N',
    currentCard: '28',
  },
  {
    id: '125',
    title: 'Bai cua Minh',
    tag: 'Thieu nhi',
    totalCards: '40',
    avatar: 'M',
    currentCard: '28',
  },
];

const questionInfo = {
  question1:
    'Em yeu truong em voi bao ban than va co giao hien nhu yeu que huong cap sach den truong.',
  question2:
    'Để có được 10 đồng tiền vàng, một ông lão đã phải nhảy xuống biển nhặt nó. Vậy hỏi đồng tiền vàng đó nặng bao nhiêu?',
};

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
