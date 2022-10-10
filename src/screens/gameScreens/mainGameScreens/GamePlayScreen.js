import React from 'react';
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Color, ColorVariant, Typography} from 'src/themes';
import {
  ElevatedCard,
  FilledButton,
  FilledIconButton,
  OutlinedButton,
} from 'src/components';
import {ElevatedHeader} from './components';

const screenWidth = Dimensions.get('screen').width;
export default function GamePlayScreen(props) {
  const {
    headerTypo = Typography.title.large,
    subHeaderTypo = Typography.label.large,
    bodyTypo = Typography.body.large,
    colorVariant = ColorVariant.surface,
    style,
    ...otherProps
  } = props;
  const baseColor = Color.light[colorVariant]?.base;

  const defaultContainerStyle = [
    {backgroundColor: baseColor},
    styles.container,
    style,
  ];

  const handlePressFilledButton = () => {
    alert('move to game screen');
  };

  return (
    <SafeAreaView {...otherProps} style={defaultContainerStyle}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <ElevatedHeader
          head={cardInfo?.title}
          subHeadLeft={`Lá thứ ${cardInfo?.currentCard}/${cardInfo?.totalCards} `}
          headStyle={headerTypo}
          subHeadStyle={subHeaderTypo}
          style={styles.header}
          containerStyle={styles.header}
        />
        <View style={styles.gameCardLayout}>
          <ElevatedCard style={shadowStyle} containerStyle={styles.gameCard}>
            {item?.icon && <FilledIconButton content={item?.icon} />}
            {questionInfo?.question1 && (
              <Text style={[bodyTypo, styles.text]}>
                {questionInfo?.question1}
              </Text>
            )}
          </ElevatedCard>
        </View>
        <View style={styles.action}>
          <OutlinedButton
            content={'Lá trước'}
            onPress={handlePressFilledButton}
          />
          <FilledButton
            content={'Lá tiép theo'}
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

const cardInfo = {
  id: '123',
  title: 'Bai cua Nam',
  tag: 'Thieu nhi',
  totalCards: '30',
  avatar: 'N',
  currentCard: '28',
};

const questionInfo = {
  question1:
    'Em yeu truong em voi bao ban than va co giao hien nhu yeu que huong cap sach den truong.',
};
const item = {};
