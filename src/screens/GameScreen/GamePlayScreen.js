import React from 'react';
import {Dimensions, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {Color, ColorVariant, Typography} from 'src/themes';
import {
  ElevatedCard,
  FilledButton,
  FilledIconButton,
  OutlinedButton,
} from '../../components';
import {ElevatedHeader} from '../components';

//TODO: refactor ->: const {width: screenWidth, height: screenHeight } = Dimensions.get('window');
const width = Dimensions.get('window').width,
  height = Dimensions.get('window').height;

//TODO: GamePlayScreen define it own style
export default function GamePlayScreen(props) {
  const {
    typoHeader = Typography.title.large,
    typoSubHeader = Typography.label.large,
    typoSupportingText = Typography.title.medium,
    typoBody = Typography.body.large,
    colorVariant = ColorVariant.surface,
    style,
    ...otherProps
  } = props;

  const {base} = Color.light[colorVariant];

  const defaultContainerStyle = [
    {backgroundColor: base},
    styles.container,
    style,
  ];
  const description = 'Xem trước 10 lá bài';

  const handlePressFilledButton = () => {
    alert('move to game screen');
  };

  return (
    <SafeAreaView {...otherProps} style={defaultContainerStyle}>
      <ElevatedHeader
        head={cardInfo?.title}
        subHead1={cardInfo?.tag}
        subHead2={`Tổng số ${cardInfo?.totalCards} lá`}
        headStyle={[typoHeader]}
        subHeadStyle={[typoSubHeader]}
        style={styles.header}
      />
      <View style={styles.supportingText}>
        {description && <Text style={typoSupportingText}>{description}</Text>}
      </View>
      <View style={styles.gameCard}>
        <ElevatedCard style={styles.gameCard}>
          {item?.icon && <FilledIconButton content={item?.icon} />}
          {questionInfo?.question1 && (
            <Text style={[typoBody, styles.text]}>
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: width,
    height: height,
    alignItems: 'center',
    backgroundColor: 'red',
  },
  header: {
    height: height * 0.1,
    backgroundColor: 'coral',
    alignItems: 'center',
  },
  supportingText: {
    height: height * 0.1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gameCard: {
    width: width * 0.7,
    height: height * 0.6,
    justifyContent: 'center',
  },
  action: {
    width: width,
    height: height * 0.1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
    paddingHorizontal: 32,
  },
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
