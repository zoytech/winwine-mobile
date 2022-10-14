import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import API from '../../../api';
import {Color, ColorVariant, Typography} from 'src/themes';
import {ElevatedCard, FilledButton, OutlinedButton} from 'src/components';
import {ElevatedHeader} from './components';

const screenWidth = Dimensions.get('screen').width;
export default function GamePlayScreen(props) {
  const {
    key = 3,
    onContinueButtonPressed = () => {},
    onLookBackButtonPressed = () => {},
    headerTypo = Typography.title.large,
    subHeaderTypo = Typography.label.large,
    bodyTypo = Typography.body.large,
    colorVariant = ColorVariant.surface,
    style,
    ...otherProps
  } = props;

  const [packageItem, setPackageItem] = useState({});
  const [currentCard, setCurrentCard] = useState(0);
  const {name: name, data: data = []} = packageItem || {};
  // const {
  //   id: id,
  //   text: question,
  //   count: count,
  //   uses: uses,
  //   rounds: rounds,
  // } = data[currentCard];
  const baseColor = Color.light[colorVariant]?.base;
  useEffect(() => {
    getQuestionList();
  }, []);

  const getQuestionList = async () => {
    const DATA = await API.getQuestionPackagesList();
    const currentData = DATA.find(item => item.key === key.toString());
    setPackageItem(currentData);
  };

  const defaultContainerStyle = [
    {backgroundColor: baseColor},
    styles.container,
    style,
  ];

  function handleContinueButtonPressed() {
    currentCard === 0 ? '' : setCurrentCard(currentCard - 1);
    onContinueButtonPressed();
  }

  function handleLookBackButtonPressed() {
    currentCard === data.length ? '' : setCurrentCard(currentCard + 1);
    onLookBackButtonPressed();
  }

  return (
    <SafeAreaView {...otherProps} style={defaultContainerStyle}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <ElevatedHeader
          head={name}
          subHeadLeft={`Lá thứ ${currentCard + 1}/${data.length} `}
          headStyle={headerTypo}
          subHeadStyle={subHeaderTypo}
          style={styles.header}
          containerStyle={styles.header}
        />
        <ElevatedCard style={shadowStyle} containerStyle={styles.gameCard}>
          <Text style={[bodyTypo, styles.text]}>{data[currentCard]?.text}</Text>
        </ElevatedCard>
        <View style={styles.action}>
          <OutlinedButton
            content={'Lá trước'}
            onPress={handleLookBackButtonPressed}
            disabled={currentCard === 0}
          />
          <FilledButton
            content={'Lá tiép theo'}
            onPress={handleContinueButtonPressed}
            disabled={currentCard === data.length - 1}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: screenWidth,
  },
  scrollView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    width: '100%',
    aspectRatio: 5,
  },
  gameCardLayout: {
    padding: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gameCard: {
    width: '80%',
    aspectRatio: 3 / 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  action: {
    width: '100%',
    aspectRatio: 4,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
    paddingHorizontal: 32,
  },
});

const shadowStyle = StyleSheet.compose(styles.gameCard, {
  width: '100%',
});
