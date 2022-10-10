import React from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import member1 from '../../../assets/images/preview-package/member1.jpg';
import {Typography} from 'src/themes';
import {FilledButton, OutlinedButton, OutlinedCard} from 'src/components';
import {ElevatedHeader} from './components';

const screenWidth = Dimensions.get('screen').width;
export default function GameEndScreen(props) {
  const {
    headerTypo = Typography.title.large,
    subHeaderTypo = Typography.title.medium,
    supportingTextTypo = Typography.title.medium,
    buttonTypo = Typography.label.large,
    style,
    ...otherProps
  } = props;
  const description = 'Bạn đã chơi hết rồi';

  const handlePressFilledButton = () => {
    alert('move to home screen');
  };
  const handlePressOutlinedButton = () => {
    alert('move to game screen');
  };
  return (
    <SafeAreaView {...otherProps} style={styles.screenView}>
      <OutlinedCard style={styles.baseCard}>
        <ElevatedHeader
          head={cardInfo?.title}
          subHead1={cardInfo?.tag}
          headStyle={headerTypo}
          subHeadStyle={subHeaderTypo}
          style={styles.header}
          containerStyle={styles.header}
        />
        <Image style={styles.media} source={member1} />
        <View style={styles.supportingText}>
          {description && <Text style={supportingTextTypo}>{description}</Text>}
        </View>
        <View style={styles.action}>
          <OutlinedButton
            content={'Chơi lại'}
            onPress={handlePressOutlinedButton}
          />
          <FilledButton
            content={'Chơi bộ mới'}
            contentStyle={buttonTypo}
            onPress={handlePressFilledButton}
          />
        </View>
      </OutlinedCard>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screenView: {
    width: screenWidth,
    alignItems: 'center',
    justifyContent: 'center',
  },
  baseCard: {
    width: '80%',
  },
  header: {
    width: '100%',
    aspectRatio: 10 / 3,
  },
  media: {
    width: '100%',
    aspectRatio: 10 / 6,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  supportingText: {
    width: '100%',
    aspectRatio: 10 / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  action: {
    width: '100%',
    aspectRatio: 10 / 2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const cardInfo = {
  id: '123',
  title: 'Bai cua Nam',
  tag: 'Thieu nhi',
  totalCards: '30',
  currentCard: '28',
};
