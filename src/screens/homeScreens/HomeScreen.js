import React from 'react';
import {
  Dimensions,
  FlatList,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import {PrimaryChip, SecondaryChip} from 'src/components';
import {Typography} from 'src/themes';
import MiniCardItem from './components/MiniCardItem/MiniCardItem';

const {width: screenWidth} = Dimensions.get('screen');

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
