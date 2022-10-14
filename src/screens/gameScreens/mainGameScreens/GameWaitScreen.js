import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Color, ColorVariant, Typography} from 'src/themes';
import {ElevatedCard, FilledButton, FilledIconButton} from 'src/components';
import {ElevatedHeader} from './components';
import API from '../../../api';

const {width: screenWidth} = Dimensions.get('screen');

export default function GameWaitScreen(props) {
  const {
    keyPackage = 14,
    onBackwardButtonPressed = () => {},
    onForwardButtonPressed = () => {},
    headerTypo = Typography.title.large,
    subHeaderTypo = Typography.label.large,
    supportingTextTypo = Typography.title.medium,
    bodyTypo = Typography.body.large,
    colorVariant = ColorVariant.surface,
    style,
    ...otherProps
  } = props;

  const [packageItem, setPackageItem] = useState({});
  const [currentCard, setCurrentCard] = useState(0);
  const baseColor = Color.light[colorVariant]?.base;
  const {package: name, tag: tag, data: questions = []} = packageItem || {};
  const TOTAL_QUESTIONS = questions.length;

  const defaultContainerStyle = [
    {backgroundColor: baseColor},
    styles.container,
    style,
  ];

  function previewNumberOfCard(total) {
    const MAX_VIEW = 10;
    return total >= MAX_VIEW
      ? `Xem trước ${MAX_VIEW} lá bài`
      : `Xem trước ${total} lá bài`;
  }

  useEffect(() => {
    getQuestionList();
  }, []);

  const getQuestionList = async () => {
    const packageListData = await API.getQuestionPackagesList();
    const currentPackageData = packageListData.find(
      item => item.key === keyPackage.toString(),
    );
    setPackageItem(currentPackageData);
  };

  function handlePressFilledButton() {
    alert('move to game screen');
  }

  function handleBackwardButtonPressed() {
    currentCard === 0 ? '' : setCurrentCard(currentCard - 1);
    onBackwardButtonPressed();
  }

  function handleForwardButtonPressed() {
    currentCard === TOTAL_QUESTIONS ? '' : setCurrentCard(currentCard + 1);
    onForwardButtonPressed();
  }

  return (
    <SafeAreaView {...otherProps} style={defaultContainerStyle}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <ElevatedHeader
          head={name}
          subHeadLeft={tag}
          subHeadRight={`Tổng số ${TOTAL_QUESTIONS} lá`}
          headStyle={headerTypo}
          subHeadStyle={subHeaderTypo}
          style={styles.header}
          containerStyle={styles.header}
        />

        <View style={styles.supportingText}>
          <Text style={supportingTextTypo}>
            {previewNumberOfCard(TOTAL_QUESTIONS)}
          </Text>
        </View>
        <View style={styles.cardWithButton}>
          <FilledIconButton
            name="caretleft"
            onPressOut={handleBackwardButtonPressed}
            disabled={currentCard === 0}
          />
          <ElevatedCard style={shadowStyle} containerStyle={styles.gameCard}>
            <Text style={[bodyTypo, styles.text]}>
              {questions[currentCard]?.text}
            </Text>
          </ElevatedCard>
          <FilledIconButton
            name="caretright"
            onPressOut={handleForwardButtonPressed}
            disabled={currentCard === TOTAL_QUESTIONS - 1}
          />
        </View>
        <View style={styles.action}>
          <FilledButton
            content={'Choi ngay'}
            onPress={handlePressFilledButton}
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
    aspectRatio: 4,
  },
  supportingText: {
    width: '100%',
    aspectRatio: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardWithButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gameCard: {
    width: '70%',
    aspectRatio: 7 / 10,
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

const shadowStyle = StyleSheet.compose(styles.gameCard, {width: '100%'});
