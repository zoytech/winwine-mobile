import {Color, ColorVariant, Typography} from '../../../../themes';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import member1 from '../../../../assets/images/preview-package/member1.jpg';
import {FilledButton, OutlinedCard} from '../../../../components';

export default function MiniCardItem(props) {
  const {
    typoTitle = Typography.label.large,
    typoSubTitle = Typography.label.medium,
    typoButton = Typography.label.small,
    colorSurface = ColorVariant.surface,
    colorOutline = ColorVariant.outline,
  } = props;

  const {base: baseColor} = Color.light[colorSurface];
  const {base: outline} = Color.light[colorOutline];
  const containerStyle = [
    styles.container,
    {borderColor: outline, backgroundColor: baseColor},
  ];

  const handlePressFilledButton = () => {
    alert('move to new card');
  };
  const handlePressOutlinedButton = () => {
    alert('move to previous card');
  };
  return (
    <OutlinedCard style={containerStyle}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.frame}>
          <Image style={styles.media} source={member1} />
        </View>
        <View style={styles.headline}>
          {cardInfo?.title && <Text style={typoTitle}>{cardInfo.title}</Text>}
          {cardInfo?.tag && <Text style={typoSubTitle}>{cardInfo.tag}</Text>}
        </View>
        <View style={styles.action}>
          <FilledButton
            content={'play now'}
            contentStyle={typoButton}
            style={styles.button}
            onPress={handlePressFilledButton}
          />
        </View>
      </ScrollView>
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
    width: 128,
    justifyContent: 'center',
    margin: 20,
  },
  scrollView: {
    width: '100%',
    alignItems: 'center',
  },
  frame: {
    width: '100%',
  },
  media: {
    // width: '100%',
    aspectRatio: 3 / 2,
    resizeMode: 'contain',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headline: {
    width: '100%',
    aspectRatio: 5 / 2,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingHorizontal: 6,
  },
  action: {
    width: '100%',
    aspectRatio: 5 / 2,
    flexDirection: 'row',
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
