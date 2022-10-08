import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import memberImg from 'src/assets/images/preview-package/member1.jpg';
import {FilledButton, OutlinedCard} from 'src/components';
import {Color, ColorVariant, Typography} from 'src/themes';

const {width: screenWidth} = Dimensions.get('screen');

export default function MiniCardItem(props) {
  const {
    data,
    style,
    onPress = () => {},
    onActionButtonPress = () => {},
    titleStyle = Typography.label.large,
    subTitleStyle = Typography.label.medium,
    buttonStyle = Typography.label.small,
  } = props;

  const {title, tag} = data || {};

  const handlePressFilledButton = () => {
    onActionButtonPress();
  };
  const handlePressOutlinedButton = () => {
    onActionButtonPress();
  };
  return (
    <OutlinedCard style={[styles.container, style]} onPress={onPress}>
      <Image style={styles.media} source={memberImg} />
      <View style={styles.headline}>
        {title && <Text style={titleStyle}>{title}</Text>}
        {tag && <Text style={subTitleStyle}>{tag}</Text>}
      </View>
      <View style={styles.action} onPress={handlePressOutlinedButton}>
        <FilledButton
          content={'play now'}
          contentStyle={buttonStyle}
          style={styles.button}
          onPress={handlePressFilledButton}
        />
      </View>
    </OutlinedCard>
  );
}

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
  question2:
    'Để có được 10 đồng tiền vàng, một ông lão đã phải nhảy xuống biển nhặt nó. Vậy hỏi đồng tiền vàng đó nặng bao nhiêu?',
};

const styles = StyleSheet.create({
  container: {
    width: screenWidth * 0.35,
    aspectRatio: 0.67,
    justifyContent: 'center',

    position: 'relative',
  },
  media: {
    width: '100%',
    height: '60%',
    overflow: 'hidden',
    resizeMode: 'cover',
  },
  headline: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingHorizontal: 6,
  },
  action: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: '75%',
    aspectRatio: 3,
    borderRadius: 20,
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
});
