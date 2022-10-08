import {Color, ColorVariant, Typography} from '../../../../themes';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import Header from './Header';
import member1 from '../../../../assets/images/preview-package/member1.jpg';
import {
  FilledButton,
  OutlinedButton,
  OutlinedCard,
} from '../../../../components';

export default function CardPackageSample(props) {
  const {
    typoHeader = Typography.title.medium,
    typoSubHeader = Typography.body.medium,
    typoTitle = Typography.body.large,
    typoSupportingText = Typography.body.medium,
    typoButton = Typography.label.large,
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
      <Header
        head={cardInfo?.title}
        subHead1={cardInfo?.tag}
        headStyle={[typoHeader]}
        subHeadStyle={[typoSubHeader]}
        style={styles.header}
        containerStyle={styles.header}
      />
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Image style={styles.media} source={member1} />
        <View style={styles.headline}>
          {cardInfo?.title && <Text style={typoTitle}>{cardInfo.title}</Text>}
          {cardInfo?.tag && <Text style={typoSubHeader}>{cardInfo.tag}</Text>}
        </View>
        <View style={styles.supportingText}>
          {questionInfo?.question2 && (
            <Text style={typoSupportingText}>{questionInfo.question2}</Text>
          )}
        </View>
        <View style={styles.action}>
          <OutlinedButton
            content={'back now'}
            onPress={handlePressOutlinedButton}
          />
          <FilledButton
            content={'play now'}
            contentStyle={typoButton}
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
    width: 320,
    justifyContent: 'center',
  },
  scrollView: {
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  header: {
    width: '100%',
    aspectRatio: 5,
  },
  media: {
    width: '100%',
    aspectRatio: 5 / 3,
    resizeMode: 'cover',
    alignSelf: 'center',
  },
  supportingText: {
    width: '100%',
    aspectRatio: 10 / 3,
    alignItems: 'flex-start',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  action: {
    width: '100%',
    aspectRatio: 10 / 3,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  headline: {
    width: '100%',
    aspectRatio: 10 / 2,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
});

// const headerStyle = StyleSheet.compose();
// const headlineStyle = StyleSheet.compose();
// const supportingTextStyle = StyleSheet.compose();
// const mediaStyle = StyleSheet.compose();
// const actionStyle = StyleSheet.compose();
