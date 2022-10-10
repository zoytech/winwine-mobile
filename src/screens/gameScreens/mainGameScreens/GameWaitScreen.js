import React from 'react';
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {Color, ColorVariant, Typography} from 'src/themes';
import {ElevatedCard, FilledButton} from 'src/components';
import {ElevatedHeader} from './components';

const {width: screenWidth} = Dimensions.get('screen');

export default function GameWaitScreen(props) {
  const {
    headerTypo = Typography.title.large,
    subHeaderTypo = Typography.label.large,
    supportingTextTypo = Typography.title.medium,
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
  const description = 'Xem trước 10 lá bài';

  const handlePressFilledButton = () => {
    alert('move to game screen');
  };
  const handlePressIconButton = () => {
    alert('move to game screen');
  };

  return (
    <SafeAreaView {...otherProps} style={defaultContainerStyle}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <ElevatedHeader
          head={cardInfo?.title}
          subHeadLeft={cardInfo?.tag}
          subHeadRight={`Tổng số ${cardInfo?.totalCards} lá`}
          headStyle={headerTypo}
          subHeadStyle={subHeaderTypo}
          style={styles.header}
          containerStyle={styles.header}
        />
        <View style={styles.supportingText}>
          {description && <Text style={supportingTextTypo}>{description}</Text>}
        </View>
        <View style={styles.cardWithButton}>
          <Icon.Button
            name="leftcircle"
            size={30}
            backgroundColor="#900"
            onPress={handlePressIconButton}
          />
          <ElevatedCard style={shadowStyle} containerStyle={styles.gameCard}>
            {questionInfo?.question1 && (
              <Text style={[bodyTypo, styles.text]}>
                {questionInfo?.question1}
              </Text>
            )}
          </ElevatedCard>
          <Icon name="rightcircle" size={30} color="#900" />
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
