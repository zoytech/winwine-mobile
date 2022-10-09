import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import memberImg from 'src/assets/images/preview-package/member1.jpg';
import {FilledButton, OutlinedCard} from 'src/components';
import {Typography} from 'src/themes';

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

  const handlePressedImageArea = () => {
    onActionButtonPress();
    alert('Move to game wait screen');
  };
  const handlePressButton = () => {
    onActionButtonPress();
    alert('Move to game play screen');
  };
  return (
    <OutlinedCard style={[styles.container, style]} onPress={onPress}>
      <Pressable onPress={handlePressedImageArea} style={styles.pressedArea}>
        <Image source={memberImg} style={styles.media} />
      </Pressable>

      <View style={styles.headline}>
        {title && <Text style={titleStyle}>{title}</Text>}
        {tag && <Text style={subTitleStyle}>{tag}</Text>}
      </View>
      <View style={styles.action}>
        <FilledButton
          content={'play now'}
          contentStyle={buttonStyle}
          style={styles.button}
          onPress={handlePressButton}
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
    overflow: 'hidden',
    position: 'relative',
  },
  pressedArea: {
    width: '100%',
    height: '60%',
  },
  media: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    backgroundColor: 'blue',
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
    width: '70%',
    aspectRatio: 3,
    borderRadius: 20,
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
});
